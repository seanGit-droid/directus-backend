/*!
 * Axios Cache Interceptor 1.11.1
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import { parse } from 'cache-parser';
import { deferred } from 'fast-defer';
import { parse as parse$1, compare } from 'http-vary';
import { hash } from 'object-code';
import { Result } from 'try';

const Header = {
  /**
   * ```txt
   * If-Modified-Since: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since
   */
  IfModifiedSince: 'if-modified-since',
  /**
   * ```txt
   * Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified
   */
  LastModified: 'last-modified',
  /**
   * ```txt
   * If-None-Match: "<etag_value>"
   * If-None-Match: "<etag_value>", "<etag_value>", …
   * If-None-Match: *
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match
   */
  IfNoneMatch: 'if-none-match',
  /**
   * ```txt
   * Cache-Control: max-age=604800
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
   */
  CacheControl: 'cache-control',
  /**
   * ```txt
   * Pragma: no - cache;
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma
   */
  Pragma: 'pragma',
  /**
   * ```txt
   * ETag: W / '<etag_value>';
   * ETag: '<etag_value>';
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
   */
  ETag: 'etag',
  /**
   * ```txt
   * Expires: <http-date>
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires
   */
  Expires: 'expires',
  /**
   * ```txt
   * Age: <delta-seconds>
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Age
   */
  Age: 'age',
  /**
   * Used internally as metadata to mark the cache item as revalidatable and enabling
   * stale cache state Contains a string of ASCII characters that can be used as ETag for
   * `If-Match` header Provided by user using `cache.etag` value.
   *
   * ```txt
   * X-Axios-Cache-Etag: "<etag_value>"
   * ```
   */
  XAxiosCacheEtag: 'x-axios-cache-etag',
  /**
   * Used internally as metadata to mark the cache item as revalidatable and enabling
   * stale cache state may contain `'use-cache-timestamp'` if `cache.modifiedSince` is
   * `true`, otherwise will contain a date from `cache.modifiedSince`. If a date is
   * provided, it can be used for `If-Modified-Since` header, otherwise the cache
   * timestamp can be used for `If-Modified-Since` header.
   *
   * ```txt
   * X-Axios-Cache-Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
   * X-Axios-Cache-Last-Modified: use-cache-timestamp
   * ```
   */
  XAxiosCacheLastModified: 'x-axios-cache-last-modified',
  /**
   * Used internally as metadata to mark the cache item able to be used if the server
   * returns an error. The stale-if-error response directive indicates that the cache can
   * reuse a stale response when any error occurs.
   *
   * ```txt
   * XAxiosCacheStaleIfError: <seconds>
   * ```
   */
  XAxiosCacheStaleIfError: 'x-axios-cache-stale-if-error',
  /**
   * Indicates which request headers affect the response content.
   * Used to prevent cache poisoning when responses differ based on request headers.
   *
   * ```txt
   * Vary: Authorization
   * Vary: Authorization, Accept-Language
   * Vary: *
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary
   */
  Vary: 'vary'
};

const defaultHeaderInterpreter = (headers, location) => {
  if (!headers) return 'not enough headers';
  const cacheControl = headers[Header.CacheControl];
  if (cacheControl) {
    const cc = parse(String(cacheControl));
    if (
    // Header told that this response should not be cached.
    cc.noCache || cc.noStore ||
    // Server side handling private data
    location === 'server' && cc.private) {
      return 'dont cache';
    }
    if (cc.immutable) {
      // 1 year is sufficient, as Infinity may cause problems with certain storages.
      // It might not be the best way, but a year is better than none. Facebook shows
      // that a browser session stays at the most 1 month.
      return {
        cache: 1000 * 60 * 60 * 24 * 365
      };
    }
    if (cc.maxAge !== undefined) {
      const age = headers[Header.Age];
      return {
        cache: age ?
        // If age is present, we must subtract it from maxAge
        (cc.maxAge - Number(age)) * 1000 : cc.maxAge * 1000,
        // Already out of date, must be requested again
        stale:
        // I couldn't find any documentation about who should be used, as they
        // are not meant to overlap each other. But, as we cannot request in the
        // background, as the stale-while-revalidate says, and we just increase
        // its staleTtl when its present, max-stale is being preferred over
        // stale-while-revalidate.
        cc.maxStale !== undefined ? cc.maxStale * 1000 : cc.staleWhileRevalidate !== undefined ? cc.staleWhileRevalidate * 1000 : undefined
      };
    }
  }
  const expires = headers[Header.Expires];
  if (expires) {
    const milliseconds = Date.parse(String(expires)) - Date.now();
    return milliseconds >= 0 ? {
      cache: milliseconds
    } : 'dont cache';
  }
  return 'not enough headers';
};

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

/**
 * Extracts specified header values from request headers.
 * Generic utility for extracting a subset of headers.
 *
 * @param requestHeaders The full request headers object
 * @param headerNames Array of header names to extract
 * @returns Object with extracted header values
 */
function extractHeaders(requestHeaders, headerNames) {
  const result = {};
  for (const name of headerNames) {
    var _requestHeaders$get;
    result[name] = (_requestHeaders$get = requestHeaders.get(name)) == null ? void 0 : _requestHeaders$get.toString();
  }
  return result;
}

/** Tests an response against a {@link CachePredicateObject}. */
async function testCachePredicate(response, predicate) {
  if (typeof predicate === 'function') {
    return predicate(response);
  }
  const {
    statusCheck,
    responseMatch,
    containsHeaders
  } = predicate;
  if (statusCheck && !(await statusCheck(response.status)) || responseMatch && !(await responseMatch(response))) {
    return false;
  }
  if (containsHeaders) {
    for (const [header, _predicate] of Object.entries(containsHeaders)) {
      var _response$headers$hea;
      if (!(await _predicate(// Avoid bugs in case the header is not in lower case
      (_response$headers$hea = response.headers[header.toLowerCase()]) != null ? _response$headers$hea : response.headers[header]))) {
        return false;
      }
    }
  }
  return true;
}
/**
 * Determines whether a given URL matches a specified pattern, which can be either a
 * string or a regular expression.
 *
 * @param matchPattern - The pattern to match against
 *
 *   - If it's a regular expression, it will be reset to ensure consistent behavior for
 *       stateful regular expressions.
 *   - If it's a string, the function checks if the URL contains the string.
 *
 * @param configUrl - The URL to test against the provided pattern; normally `config.url`.
 * @returns `true` if the `configUrl` matches the `matchPattern`
 */
function regexOrStringMatch(matchPattern, configUrl) {
  if (matchPattern instanceof RegExp) {
    matchPattern.lastIndex = 0; // Reset the regex to ensure consistent matching
    return matchPattern.test(configUrl);
  }
  return configUrl.includes(matchPattern);
}

/**
 * Creates a new validateStatus function that will use the one already used and also
 * accept status code 304.
 */
function createValidateStatus(oldValidate) {
  return oldValidate ? status => oldValidate(status) || status === 304 : status => status >= 200 && status < 300 || status === 304;
}
/** Checks if the given method is in the methods array */
function isMethodIn(requestMethod = 'get', methodList = []) {
  requestMethod = requestMethod.toLowerCase();
  return methodList.some(method => method === requestMethod);
}
/**
 * This function updates the cache when the request is stale. So, the next request to the
 * server will be made with proper header / settings.
 */
function updateStaleRequest(cache, config) {
  const {
    etag,
    modifiedSince
  } = config.cache;
  if (etag) {
    var _cache$data;
    const etagValue = etag === true ? (_cache$data = cache.data) == null ? void 0 : _cache$data.headers[Header.ETag] : etag;
    if (etagValue) {
      config.headers.set(Header.IfNoneMatch, etagValue);
    }
  }
  if (modifiedSince) {
    config.headers.set(Header.IfModifiedSince,
    // If last-modified is not present, use the createdAt timestamp
    modifiedSince === true ? cache.data.headers[Header.LastModified] || new Date(cache.createdAt).toUTCString() : modifiedSince.toUTCString());
  }
}
/**
 * Creates the new date to the cache by the provided response. Also handles possible 304
 * Not Modified by updating response properties.
 */
function createCacheResponse(response, previousCache) {
  if (response.status === 304 && previousCache) {
    // Set the cache information into the response object
    response.cached = true;
    response.data = previousCache.data;
    response.status = previousCache.status;
    response.statusText = previousCache.statusText;
    // Update possible new headers
    response.headers = _extends({}, previousCache.headers, response.headers);
    // return the old cache
    return previousCache;
  }
  // New Response
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
}

function defaultRequestInterceptor(axios) {
  const onFulfilled = async config => {
    var _cache$data;
    config.id = axios.generateKey(config, {
      vary: config.cache && Array.isArray(config.cache.vary) ? extractHeaders(config.headers, config.cache.vary) : undefined
    });
    if (config.cache === false) {
      return config;
    }
    // merge defaults with per request configuration
    config.cache = _extends({}, axios.defaults.cache, config.cache);
    // Check if cache is disabled via enabled flag
    if (config.cache.enabled === false) {
      return config;
    }
    // ignoreUrls (blacklist)
    if (typeof config.cache.cachePredicate === 'object' && config.cache.cachePredicate.ignoreUrls && config.url) {
      for (const url of config.cache.cachePredicate.ignoreUrls) {
        if (regexOrStringMatch(url, config.url)) {
          return config;
        }
      }
    }
    // allowUrls
    if (typeof config.cache.cachePredicate === 'object' && config.cache.cachePredicate.allowUrls && config.url) {
      let matched = false;
      for (const url of config.cache.cachePredicate.allowUrls) {
        if (regexOrStringMatch(url, config.url)) {
          matched = true;
          break;
        }
      }
      if (!matched) {
        return config;
      }
    }
    // Applies sufficient headers to prevent other cache systems to work along with this one
    //
    // Its currently used before isMethodIn because if the isMethodIn returns false, the request
    // shouldn't be cached an therefore neither in the browser.
    // https://stackoverflow.com/a/2068407
    if (config.cache.cacheTakeover) {
      config.headers.set(Header.CacheControl, 'no-cache, no-store, must-revalidate, max-age=0', false);
      config.headers.set(Header.Pragma, 'no-cache', false);
      config.headers.set(Header.Expires, '0', false);
    }
    if (!isMethodIn(config.method, config.cache.methods)) {
      return config;
    }
    // Assumes that the storage handled staled responses
    let cache = await axios.storage.get(config.id, config);
    const overrideCache = config.cache.override;
    // Checks for vary mismatches in cached responses before proceeding
    // If a vary mismatch is detected, it will generate a new key based on the
    // current request headers and re-fetch the cache.
    if (
    // Vary enabled
    config.cache.vary !== false && // Had vary headers in cached response (cached or stale)
    (_cache$data = cache.data) != null && (_cache$data = _cache$data.meta) != null && _cache$data.vary &&
    // Previous response had Vary header to use
    cache.data.headers[Header.Vary]) {
      var _cache$data$meta;
      const vary = Array.isArray(config.cache.vary) ? config.cache.vary : parse$1(cache.data.headers[Header.Vary]);
      // Compares current request headers with cached vary headers (meta.vary)
      if (vary && vary !== '*' && !compare(vary, (_cache$data$meta = cache.data.meta) == null ? void 0 : _cache$data$meta.vary, config.headers)) {
        // Generate base key without id field (otherwise returns config.id)
        const newKey = axios.generateKey(_extends({}, config, {
          id: undefined
        }), {
          vary: extractHeaders(config.headers, vary)
        });
        // If ends up being a new key, change the cache to the new one
        if (config.id !== newKey) {
          config.id = newKey;
          cache = await axios.storage.get(newKey, config);
        }
      }
    }
    // Not cached, continue the request, and mark it as fetching
    // biome-ignore lint/suspicious/noConfusingLabels: required to break condition in simultaneous accesses
    ignoreAndRequest: if (cache.state === 'empty' || cache.state === 'stale' || cache.state === 'must-revalidate' || overrideCache) {
      // This checks for simultaneous access to a new key. The js event loop jumps on the
      // first await statement, so the second (asynchronous call) request may have already
      // started executing.
      if (axios.waiting.has(config.id) && !overrideCache) {
        cache = await axios.storage.get(config.id, config);
        // This check is required when a request has it own cache deleted manually, lets
        // say by a `axios.storage.delete(key)` and has a concurrent loading request.
        // Because in this case, the cache will be empty and may still has a pending key
        // on waiting map.
        if (cache.state !== 'empty' && cache.state !== 'must-revalidate') {
          break ignoreAndRequest;
        }
      }
      // Create a deferred to resolve other requests for the same key when it's completed
      const def = deferred();
      axios.waiting.set(config.id, def);
      // Adds a default reject handler to catch when the request gets aborted without
      // others waiting for it.
      def.catch(() => undefined);
      await axios.storage.set(config.id, {
        state: 'loading',
        previous: overrideCache ?
        // Simply determine if the request is stale or not
        // based if it had previous data or not
        cache.data ? 'stale' : 'empty' :
        // Typescript doesn't know that cache.state here can only be 'empty' or 'stale'
        cache.state,
        data: cache.data,
        // If the cache is empty and asked to override it, use the current timestamp
        createdAt: overrideCache && !cache.createdAt ? Date.now() : cache.createdAt
      }, config);
      // Skip adding conditional headers (If-None-Match, If-Modified-Since) when override is true.
      // The override option is meant to bypass cache and get fresh data, not revalidate existing cache.
      // Adding conditional headers would cause the server to return 304 Not Modified instead of fresh data.
      if ((cache.state === 'stale' || cache.state === 'must-revalidate') && !overrideCache) {
        updateStaleRequest(cache, _extends({}, config, {
          cache: config.cache
        }));
      }
      config.validateStatus = createValidateStatus(config.validateStatus);
      // Hydrates any UI temporarily, if cache is available
      if (cache.state === 'stale' || cache.data && cache.state !== 'must-revalidate') {
        await (config.cache.hydrate == null ? void 0 : config.cache.hydrate(cache));
      }
      return config;
    }
    let cachedResponse;
    if (cache.state === 'loading') {
      const deferred = axios.waiting.get(config.id);
      // The deferred may not exists when the process is using a persistent
      // storage and cancelled  in the middle of a request, this would result in
      // a pending loading state in the storage but no current promises to resolve
      if (!deferred) {
        // Hydrates any UI temporarily, if cache is available
        if (cache.data) {
          await (config.cache.hydrate == null ? void 0 : config.cache.hydrate(cache));
        }
        return config;
      }
      try {
        var _state$data$meta;
        // Deferred can't reuse the value because the user's storage might clone
        // or mutate the value, so we need to ask it again.
        // For example with memoryStorage + cloneData
        await deferred;
        const state = await axios.storage.get(config.id, config);
        // This is a cache mismatch and should never happen, but in case it does,
        // we need to redo the request all over again.
        /* c8 ignore start */
        if (!state.data) {
          if (false) ;
          return onFulfilled(config);
        }
        /* c8 ignore end */
        // After waiting, check if this request's vary headers match the cached variant
        // If mismatch, don't use the cache - make own request to prevent cache poisoning
        if (config.cache.vary !== false && (_state$data$meta = state.data.meta) != null && _state$data$meta.vary && state.data.headers[Header.Vary]) {
          const vary = Array.isArray(config.cache.vary) ? config.cache.vary : parse$1(state.data.headers[Header.Vary]);
          // Compare vary headers - if mismatch, make own request
          if (vary && vary !== '*' && !compare(vary, state.data.meta.vary, config.headers)) {
            if (false) ;
            // Don't use cached response - rerun interceptor logic but with new key
            return onFulfilled(config);
          }
        }
        cachedResponse = state.data;
      } catch (err) {
        throw err;
      }
    } else {
      cachedResponse = cache.data;
    }
    // The cached data is already transformed after receiving the response from the server.
    // Reapplying the transformation on the transformed data will have an unintended effect.
    // Since the cached data is already in the desired format, there is no need to apply the transformation function again.
    config.transformResponse = undefined;
    // Even though the response interceptor receives this one from here,
    // it has been configured to ignore cached responses = true
    config.adapter = function cachedAdapter() {
      return Promise.resolve({
        config,
        data: cachedResponse.data,
        headers: cachedResponse.headers,
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        cached: true,
        stale: cache.previous === 'stale',
        id: config.id
      });
    };
    return config;
  };
  return {
    onFulfilled
  };
}

/** Function to update all caches, from CacheProperties.update, with the new data. */
async function updateCache(storage, data, cacheUpdater) {
  // Global cache update function.
  if (typeof cacheUpdater === 'function') {
    return cacheUpdater(data);
  }
  for (const [cacheKey, updater] of Object.entries(cacheUpdater)) {
    if (updater === 'delete') {
      await storage.remove(cacheKey, data.config);
      continue;
    }
    const value = await storage.get(cacheKey, data.config);
    if (value.state === 'loading') {
      continue;
    }
    const newValue = await updater(value, data);
    if (newValue === 'delete') {
      await storage.remove(cacheKey, data.config);
      continue;
    }
    if (newValue !== 'ignore') {
      await storage.set(cacheKey, newValue, data.config);
    }
  }
}

function defaultResponseInterceptor(axios) {
  /**
   * Replies a deferred stored in the axios waiting map. Use resolve to proceed checking the
   * previously updated cache or reject to abort deduplicated requests with error.
   */
  const replyDeferred = (responseId, mode, error) => {
    // Rejects the deferred, if present
    const deferred = axios.waiting.get(responseId);
    if (deferred) {
      deferred[mode](error);
      axios.waiting.delete(responseId);
    }
  };
  const onFulfilled = async response => {
    var _response$cached;
    // When response.config is not present, the response is indeed a error.
    if (!(response != null && response.config)) {
      // Re-throws the error
      throw response;
    }
    response.id = response.config.id;
    (_response$cached = response.cached) != null ? _response$cached : response.cached = false;
    const config = response.config;
    // Request interceptor merges defaults with per request configuration
    const cacheConfig = config.cache;
    // Response is already cached
    if (response.cached) {
      return response;
    }
    // Skip cache: either false or weird behavior
    // config.cache should always exists, at least from global config merge.
    if (!cacheConfig) {
      response.cached = false;
      return response;
    }
    // Update other entries before updating himself
    if (cacheConfig.update) {
      await updateCache(axios.storage, response, cacheConfig.update);
    }
    if (!isMethodIn(config.method, cacheConfig.methods)) {
      return response;
    }
    const cache = await axios.storage.get(response.id, config);
    if (
    // If the request interceptor had a problem or it wasn't cached
    cache.state !== 'loading') {
      // On limited storage scenarios, its possible the request was evicted while waiting
      // for the response, in this case, state will be 'empty' again instead of loading.
      // https://github.com/arthurfiorette/axios-cache-interceptor/issues/833
      axios.waiting.delete(response.id);
      return response;
    }
    // Config told that this response should not be cached.
    if (
    // For 'loading' values (previous: stale), this check already ran in the past.
    !cache.data && !(await testCachePredicate(response, cacheConfig.cachePredicate))) {
      replyDeferred(response.id, 'resolve');
      return response;
    }
    // Avoid remnant headers from remote server to break implementation
    for (const header of Object.keys(response.headers)) {
      if (header.startsWith('x-axios-cache')) {
        delete response.headers[header];
      }
    }
    if (cacheConfig.etag && cacheConfig.etag !== true) {
      response.headers[Header.XAxiosCacheEtag] = cacheConfig.etag;
    }
    if (cacheConfig.modifiedSince) {
      response.headers[Header.XAxiosCacheLastModified] = cacheConfig.modifiedSince === true ? 'use-cache-timestamp' : cacheConfig.modifiedSince.toUTCString();
    }
    let ttl = cacheConfig.ttl || -1; // always set from global config
    let staleTtl;
    if (cacheConfig.interpretHeader) {
      const expirationTime = axios.headerInterpreter(response.headers, axios.location);
      // Cache should not be used
      if (expirationTime === 'dont cache') {
        replyDeferred(response.id, 'resolve');
        return response;
      }
      if (expirationTime !== 'not enough headers') {
        if (typeof expirationTime === 'number') {
          ttl = expirationTime;
        } else {
          ttl = expirationTime.cache;
          staleTtl = expirationTime.stale;
        }
      }
    }
    if (typeof ttl === 'function') {
      ttl = await ttl(response);
    }
    const data = createCacheResponse(response, cache.data);
    // Either stales response (Vary *) or sets request Vary headers into metadata
    if (cacheConfig.vary !== false && response.headers[Header.Vary]) {
      const vary = Array.isArray(cacheConfig.vary) ? cacheConfig.vary : parse$1(response.headers[Header.Vary]);
      // For valid values, store the subset of request headers in the cache response
      if (Array.isArray(vary)) {
        var _data$meta;
        (_data$meta = data.meta) != null ? _data$meta : data.meta = {};
        data.meta.vary = extractHeaders(config.headers, vary);
        // RFC States * must revalidate every time per RFC 9110.
      } else if (vary === '*') {
        // Marks cache as stale immediately
        await axios.storage.set(response.id, {
          state: 'stale',
          createdAt: Date.now(),
          data,
          ttl
        }, config);
        replyDeferred(response.id, 'resolve');
        return response;
      }
    }
    if (cacheConfig.staleIfError) {
      response.headers[Header.XAxiosCacheStaleIfError] = String(ttl);
    }
    const newCache = {
      state: 'cached',
      ttl,
      staleTtl,
      createdAt: Date.now(),
      data
    };
    // Define this key as cache on the storage
    await axios.storage.set(response.id, newCache, config);
    replyDeferred(response.id, 'resolve');
    // Return the response with cached as false, because it was not cached at all
    return response;
  };
  const onRejected = async error => {
    // When response.config is not present, the response is indeed a error.
    if (!error.isAxiosError || !error.config) {
      // We should probably re-request the response to avoid an infinite loading state here
      // but, since this is an unknown error, we cannot figure out what request ID to use.
      // And the only solution is to let the storage actively reject the current loading state.
      throw error;
    }
    const config = error.config;
    const id = config.id;
    const cacheConfig = config.cache;
    const response = error.response;
    // config.cache should always exist, at least from global config merge.
    if (!cacheConfig || !id) {
      throw error;
    }
    if (!isMethodIn(config.method, cacheConfig.methods)) {
      // Rejects all other requests waiting for this response
      await axios.storage.remove(id, config);
      replyDeferred(id, 'reject', error);
      throw error;
    }
    const cache = await axios.storage.get(id, config);
    if (
    // This will only not be loading if the interceptor broke
    cache.state !== 'loading' || cache.previous !== 'stale') {
      // Do not clear cache if this request is cached, but the request was cancelled before returning the cached response
      if (error.code !== 'ERR_CANCELED' || error.code === 'ERR_CANCELED' && cache.state !== 'cached') {
        await axios.storage.remove(id, config);
      }
      // Rejects all other requests waiting for this response
      replyDeferred(id, 'reject', error);
      throw error;
    }
    if (cacheConfig.staleIfError) {
      const cacheControl = String(response == null ? void 0 : response.headers[Header.CacheControl]);
      const staleHeader = cacheControl && parse(cacheControl).staleIfError;
      const staleIfError = typeof cacheConfig.staleIfError === 'function' ? await cacheConfig.staleIfError(response, cache, error) : cacheConfig.staleIfError === true && staleHeader ? staleHeader * 1000 //staleIfError is in seconds
      : cacheConfig.staleIfError;
      if (staleIfError === true ||
      // staleIfError is the number of seconds that stale is allowed to be used
      typeof staleIfError === 'number' && cache.createdAt + staleIfError > Date.now()) {
        // re-mark the cache as stale
        await axios.storage.set(id, {
          state: 'stale',
          createdAt: Date.now(),
          data: cache.data
        }, config);
        // Resolve all other requests waiting for this response
        const waiting = axios.waiting.get(id);
        if (waiting) {
          waiting.resolve();
          axios.waiting.delete(id);
        }
        return {
          cached: true,
          stale: true,
          config,
          id,
          data: cache.data.data,
          headers: cache.data.headers,
          status: cache.data.status,
          statusText: cache.data.statusText
        };
      }
    }
    // Rejects all other requests waiting for this response
    await axios.storage.remove(id, config);
    replyDeferred(id, 'reject', error);
    throw error;
  };
  return {
    onFulfilled,
    onRejected
  };
}

/** Returns true if the provided object was created from {@link buildStorage} function. */
const isStorage = obj => !!obj && !!obj['is-storage'];
function hasUniqueIdentifierHeader(value) {
  const headers = value.data.headers;
  return Header.ETag in headers || Header.LastModified in headers || Header.XAxiosCacheEtag in headers || Header.XAxiosCacheLastModified in headers;
}
/** Returns true if value must be revalidated */
function mustRevalidate(value) {
  // Must revalidate is a special case and should not serve stale values
  // We could use cache-control's parse function, but this is way faster and simpler
  return String(value.data.headers[Header.CacheControl]).includes('must-revalidate');
}
/** Returns true if this has sufficient properties to stale instead of expire. */
function canStale(value) {
  if (hasUniqueIdentifierHeader(value)) {
    return true;
  }
  return value.state === 'cached' && value.staleTtl !== undefined &&
  // Only allow stale values after the ttl is already in the past and the staleTtl is in the future.
  // In cases that just createdAt + ttl > Date.now(), isn't enough because the staleTtl could be <= 0.
  // This logic only returns true when Date.now() is between the (createdAt + ttl) and (createdAt + ttl + staleTtl).
  // Following the example below:
  // |--createdAt--:--ttl--:---staleTtl--->
  // [        past        ][now is in here]
  Math.abs(Date.now() - (value.createdAt + value.ttl)) <= value.staleTtl;
}
/**
 * Checks if the provided cache is expired. You should also check if the cache
 * {@link canStale} and {@link mayUseStale}
 */
function isExpired(value) {
  return value.ttl !== undefined && value.createdAt + value.ttl <= Date.now();
}
/**
 * Defines which storage states are evicted first when cleaning up the storage.
 */
const StateEvictionOrder = {
  empty: 0,
  'must-revalidate': 1,
  stale: 2,
  cached: 3,
  // loading states usually don't have any data and are the most important ones
  // to keep around
  loading: 4
};
/**
 * Is a comparator function that sorts storage entries by their eviction priority
 * and, in the same group, by older first.
 */
function storageEntriesSorter([, a], [, b]) {
  const stateDiff = StateEvictionOrder[a.state] - StateEvictionOrder[b.state];
  if (stateDiff !== 0) return stateDiff;
  return (a.createdAt || 0) - (b.createdAt || 0);
}
/**
 * Returns true if the storage entry can be removed according to its state and the
 * provided maxStaleAge.
 */
function canRemoveStorageEntry(value, maxStaleAge) {
  switch (value.state) {
    case 'loading':
      return false;
    case 'empty':
    case 'must-revalidate':
      return true;
    case 'cached':
      return isExpired(value) && !canStale(value);
    case 'stale':
      if (maxStaleAge !== undefined && value.ttl !== undefined) {
        return Date.now() > value.createdAt + value.ttl + maxStaleAge;
      }
      return false;
  }
}
/**
 * All integrated storages are wrappers around the `buildStorage` function. External
 * libraries use it and if you want to build your own, `buildStorage` is the way to go!
 *
 * The exported `buildStorage` function abstracts the storage interface and requires a
 * super simple object to build the storage.
 *
 * **Note**: You can only create custom storages with this function.
 *
 * @example
 *
 * ```js
 * const myStorage = buildStorage({
 *   find: () => {...},
 *   set: () => {...},
 *   remove: () => {...},
 *   clear: () => {...}
 * });
 *
 * const axios = setupCache(axios, { storage: myStorage });
 * ```
 *
 * @see https://axios-cache-interceptor.js.org/guide/storages#buildstorage
 */
function buildStorage({
  set,
  find,
  remove,
  clear
}) {
  return {
    //@ts-expect-error - we don't want to expose this
    'is-storage': 1,
    set,
    remove,
    clear,
    get: async (key, config) => {
      let value = await find(key, config);
      if (!value) {
        return {
          state: 'empty'
        };
      }
      if (value.state === 'empty' || value.state === 'loading' || value.state === 'must-revalidate') {
        return value;
      }
      // Handle cached values
      if (value.state === 'cached') {
        if (!isExpired(value)) {
          return value;
        }
        // Tries to stale expired value
        if (!canStale(value)) {
          await remove(key, config);
          return {
            state: 'empty'
          };
        }
        value = {
          state: 'stale',
          createdAt: value.createdAt,
          data: value.data,
          ttl: value.staleTtl !== undefined ? value.staleTtl + value.ttl : undefined
        };
        await set(key, value, config);
        // Must revalidate is a special case and should not serve stale values
        if (mustRevalidate(value)) {
          return _extends({}, value, {
            state: 'must-revalidate'
          });
        }
      }
      // A second check in case the new stale value was created already expired.
      if (!isExpired(value)) {
        return value;
      }
      if (hasUniqueIdentifierHeader(value)) {
        return value;
      }
      await remove(key, config);
      return {
        state: 'empty'
      };
    }
  };
}

/* c8 ignore start */
/**
 * Clones an object using the structured clone algorithm if available, otherwise it uses
 * JSON.parse(JSON.stringify(value)).
 */
const clone =
// https://caniuse.com/mdn-api_structuredclone (10/18/2023 92.51%)
typeof structuredClone === 'function' ? structuredClone : value => JSON.parse(JSON.stringify(value));
/* c8 ignore stop */
/**
 * Creates a simple in-memory storage. This means that if you need to persist data between
 * page or server reloads, this will not help.
 *
 * This is the storage used by default.
 *
 * If you need to modify it's data, you can do by the `data` property.
 *
 * @example
 *
 * ```js
 * const memoryStorage = buildMemoryStorage();
 *
 * setupCache(axios, { storage: memoryStorage });
 *
 * // Simple example to force delete the request cache
 *
 * const { id } = axios.get('url');
 *
 * delete memoryStorage.data[id];
 * ```
 *
 * @param {boolean | 'double'} cloneData Use `true` if the data returned by `find()`
 *   should be cloned to avoid mutating the original data outside the `set()` method. Use
 *   `'double'` to also clone before saving value in storage using `set()`. Disabled is
 *   default
 * @param {number | false} cleanupInterval The interval in milliseconds to run a
 *   setInterval job of cleaning old entries. If false, the job will not be created.
 *   5 minutes (300_000) is default
 * @param {number | false} maxEntries The maximum number of entries to keep in the
 *   storage. Its hard to determine the size of the entries, so a smart FIFO order is used
 *   to determine eviction. If false, no check will be done and you may grow up memory
 *   usage. 1024 is default
 * @param {number} maxStaleAge The maximum age in milliseconds a stale entry can stay
 *   in the storage before being removed. Otherwise, stale-able entries would stay
 *   indefinitely causing a memory leak eventually. 1 hour (3_600_000) is default
 */
function buildMemoryStorage(cloneData = false, cleanupInterval = 5 * 60 * 1000, maxEntries = 1024, maxStaleAge = 60 * 60 * 1000) {
  function sortedEntries() {
    return Array.from(storage.data.entries()).sort(storageEntriesSorter);
  }
  const storage = buildStorage({
    set: (key, value) => {
      // More entries than allowed, evict oldest ones
      if (maxEntries && storage.data.size >= maxEntries) {
        storage.cleanup();
        // After cleanup, if still at or over capacity, manually evict entries
        if (storage.data.size >= maxEntries) {
          for (const [_key] of sortedEntries()) {
            storage.data.delete(_key);
            if (storage.data.size < maxEntries) {
              break;
            }
          }
        }
      }
      // Clone the value before storing to prevent future mutations
      // from affecting cached data.
      storage.data.set(key, cloneData === 'double' ? clone(value) : value);
    },
    remove: key => {
      storage.data.delete(key);
    },
    find: key => {
      const value = storage.data.get(key);
      return cloneData && value !== undefined ? clone(value) : value;
    },
    clear: () => {
      storage.data.clear();
    }
  });
  storage.data = new Map();
  // When this program gets running for more than the specified interval, there's a good
  // chance of it being a long-running process or at least have a lot of entries. Therefore,
  // "faster" loop is more important than code readability.
  storage.cleanup = () => {
    for (const [key, value] of sortedEntries()) {
      if (canRemoveStorageEntry(value, maxStaleAge)) {
        storage.data.delete(key);
      }
    }
  };
  if (cleanupInterval) {
    storage.cleaner = setInterval(storage.cleanup, cleanupInterval);
    // Attempt to unref the interval to not block Node.js from exiting
    if (typeof storage.cleaner === 'object' && 'unref' in storage.cleaner) {
      storage.cleaner.unref();
    }
  }
  return storage;
}

// Remove first and last '/' char, if present
const SLASHES_REGEX = /^\/|\/$/g;
/**
 * Builds an generator that receives a {@link CacheRequestConfig} and optional metadata,
 * and returns a value hashed by {@link hash}.
 *
 * The value is hashed into a signed integer when the returned value from the provided
 * generator is not a `string` or a `number`.
 *
 * You can return any type of data structure.
 *
 * @example
 *
 * ```js
 * // This generator will return a hash code.
 * // The code will only be the same if url, method and data are the same.
 * const generator = buildKeyGenerator(({ url, method, data }) => ({
 *   url,
 *   method,
 *   data
 * }));
 * ```
 */
function buildKeyGenerator(generator) {
  return (request, meta) => {
    if (request.id) {
      return request.id;
    }
    const key = generator(request, meta);
    if (typeof key === 'string' || typeof key === 'number') {
      return `${key}`;
    }
    return `${hash(key)}`;
  };
}
const defaultKeyGenerator = buildKeyGenerator(({
  baseURL,
  url,
  method,
  params,
  data
}, meta) => {
  // Remove trailing slashes to avoid generating different keys for the "same" final url.
  if (baseURL !== undefined) {
    baseURL = baseURL.replace(SLASHES_REGEX, '');
  } else {
    // just to have a consistent hash
    baseURL = '';
  }
  if (url !== undefined) {
    url = url.replace(SLASHES_REGEX, '');
  } else {
    // just to have a consistent hash
    url = '';
  }
  if (method !== undefined) {
    method = method.toLowerCase();
  } else {
    // just to have a consistent hash
    method = 'get';
  }
  return _extends({
    url: baseURL + (baseURL && url ? '/' : '') + url,
    params,
    method,
    data
  }, meta);
});

/**
 * Apply the caching interceptors for a already created axios instance.
 *
 * ```ts
 * const axios = setupCache(axios, OPTIONS);
 * ```
 *
 * The `setupCache` function receives global options and all [request
 * specifics](https://axios-cache-interceptor.js.org/config/request-specifics) ones too.
 * This way, you can customize the defaults for all requests.
 *
 * @param axios The already created axios instance
 * @param config The config for the caching interceptors
 * @returns The same instance with extended typescript types.
 * @see https://axios-cache-interceptor.js.org/config
 */
function setupCache(axios, options = {}) {
  var _options$enabled, _options$ttl, _options$etag, _options$modifiedSinc, _options$interpretHea, _options$cacheTakeove, _options$staleIfError, _options$override, _options$hydrate, _options$vary;
  const axiosCache = axios;
  if (axiosCache.defaults.cache) {
    throw new Error('setupCache() should be called only once');
  }
  axiosCache.location = typeof window === 'undefined' ? 'server' : 'client';
  axiosCache.storage = options.storage || buildMemoryStorage();
  if (!isStorage(axiosCache.storage)) {
    throw new Error('Use buildStorage() function');
  }
  axiosCache.waiting = options.waiting || new Map();
  axiosCache.generateKey = options.generateKey || defaultKeyGenerator;
  axiosCache.headerInterpreter = options.headerInterpreter || defaultHeaderInterpreter;
  axiosCache.requestInterceptor = options.requestInterceptor || defaultRequestInterceptor(axiosCache);
  axiosCache.responseInterceptor = options.responseInterceptor || defaultResponseInterceptor(axiosCache);
  axiosCache.debug = options.debug || function noop() {};
  // CacheRequestConfig values
  axiosCache.defaults.cache = {
    enabled: (_options$enabled = options.enabled) != null ? _options$enabled : true,
    update: options.update || {},
    ttl: (_options$ttl = options.ttl) != null ? _options$ttl : 1000 * 60 * 5,
    // Although RFC 7231 also marks POST as cacheable, most users don't know that
    // and may have problems about why their "create X" route not working.
    methods: options.methods || ['get', 'head'],
    cachePredicate: options.cachePredicate || {
      // All cacheable status codes defined in RFC 7231
      statusCheck: status => [200, 203, 300, 301, 302, 404, 405, 410, 414, 501].includes(status)
    },
    etag: (_options$etag = options.etag) != null ? _options$etag : true,
    // This option is going to be ignored by servers when ETag is enabled
    // Checks strict equality to false to avoid undefined-ish values
    modifiedSince: (_options$modifiedSinc = options.modifiedSince) != null ? _options$modifiedSinc : options.etag === false,
    interpretHeader: (_options$interpretHea = options.interpretHeader) != null ? _options$interpretHea : true,
    cacheTakeover: (_options$cacheTakeove = options.cacheTakeover) != null ? _options$cacheTakeove : true,
    staleIfError: (_options$staleIfError = options.staleIfError) != null ? _options$staleIfError : true,
    override: (_options$override = options.override) != null ? _options$override : false,
    hydrate: (_options$hydrate = options.hydrate) != null ? _options$hydrate : undefined,
    vary: (_options$vary = options.vary) != null ? _options$vary : true
  };
  // Apply interceptors
  axiosCache.interceptors.request.use(axiosCache.requestInterceptor.onFulfilled, axiosCache.requestInterceptor.onRejected);
  axiosCache.interceptors.response.use(axiosCache.responseInterceptor.onFulfilled, axiosCache.responseInterceptor.onRejected);
  return axiosCache;
}

/**
 * Creates a simple storage. You can persist his data by using `sessionStorage` or
 * `localStorage` with it.
 *
 * **ImplNote**: Without polyfill, this storage only works on browser environments.
 *
 * @example
 *
 * ```js
 * const fromLocalStorage = buildWebStorage(localStorage);
 * const fromSessionStorage = buildWebStorage(sessionStorage);
 *
 * const myStorage = new Storage();
 * const fromMyStorage = buildWebStorage(myStorage);
 * ```
 *
 * @param storage The type of web storage to use. localStorage or sessionStorage.
 * @param prefix The prefix to index the storage. Useful to prevent collision between
 *   multiple places using the same storage.
 * @param {number} maxStaleAge The maximum age in milliseconds a stale entry can stay
 *   in the storage before being removed. Otherwise, stale-able entries would stay
 *   indefinitely causing a memory leak eventually. 1 hour (3_600_000) is default
 */
function buildWebStorage(storage, prefix = 'axios-cache-', maxStaleAge = 60 * 60 * 1000) {
  function save(key, value) {
    storage.setItem(prefix + key, JSON.stringify(value));
  }
  return buildStorage({
    clear: () => {
      for (const key in storage) {
        if (key.startsWith(prefix)) {
          storage.removeItem(key);
        }
      }
    },
    find: key => {
      const json = storage.getItem(prefix + key);
      return json ? JSON.parse(json) : undefined;
    },
    remove: key => {
      storage.removeItem(prefix + key);
    },
    set: (key, value) => {
      const result = Result.try(save, key, value);
      if (result.ok) {
        return;
      }
      // we cannot hide non quota errors
      if (!isDomQuotaExceededError(result.error)) {
        throw result.error;
      }
      const allValues = Object.entries(storage).filter(([key]) => key.startsWith(prefix)).map(([key, value]) => [key, JSON.parse(value)]);
      // Remove all expired values
      for (const [_key, _value] of allValues) {
        if (canRemoveStorageEntry(_value, maxStaleAge)) {
          storage.removeItem(_key);
        }
      }
      // Try save again after removing expired values
      const retry = Result.try(save, key, value);
      if (retry.ok) {
        return;
      }
      // we cannot hide non quota errors
      if (!isDomQuotaExceededError(retry.error)) {
        throw retry.error;
      }
      // Storage still full, try removing the oldest value until it can be saved
      const descItems = allValues.sort((a, b) => (a[1].createdAt || 0) - (b[1].createdAt || 0));
      // Keep looping until all items are removed or the save works
      for (const item of descItems) {
        storage.removeItem(item[0]);
        const lastTry = Result.try(save, key, value);
        if (lastTry.ok) {
          return;
        }
        // we cannot hide non quota errors
        if (!isDomQuotaExceededError(lastTry.error)) {
          throw lastTry.error;
        }
      }
      // Could not save even after removing all items, just ignore since its
      // a storage quota issue.
    }
  });
}
function isDomQuotaExceededError(error) {
  var _error$constructor;
  // Check if it's a DOMException by duck-typing (works across different DOMException implementations)
  const isDOMException = error instanceof DOMException || typeof error === 'object' && error !== null && 'name' in error && ((_error$constructor = error.constructor) == null ? void 0 : _error$constructor.name) === 'DOMException';
  return isDOMException &&
  // https://stackoverflow.com/a/23375082
  'name' in error && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED' || error.name === 'QUOTA_EXCEEDED_ERR');
}

export { Header, buildKeyGenerator, buildMemoryStorage, buildStorage, buildWebStorage, canRemoveStorageEntry, canStale, createCacheResponse, createValidateStatus, defaultHeaderInterpreter, defaultKeyGenerator, defaultRequestInterceptor, defaultResponseInterceptor, isExpired, isMethodIn, isStorage, mustRevalidate, regexOrStringMatch, setupCache, storageEntriesSorter, testCachePredicate, updateCache, updateStaleRequest };
//# sourceMappingURL=index.modern.js.map