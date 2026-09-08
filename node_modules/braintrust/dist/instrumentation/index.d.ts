import { z } from 'zod/v3';

declare const ResponseFormatJsonSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
    strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
    strict?: boolean | null | undefined;
}, {
    name: string;
    description?: string | undefined;
    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
    strict?: boolean | null | undefined;
}>;
type ResponseFormatJsonSchemaType = z.infer<typeof ResponseFormatJsonSchema>;
declare const AnyModelParams: z.ZodObject<{
    temperature: z.ZodOptional<z.ZodNumber>;
    top_p: z.ZodOptional<z.ZodNumber>;
    max_tokens: z.ZodNumber;
    max_completion_tokens: z.ZodOptional<z.ZodNumber>;
    frequency_penalty: z.ZodOptional<z.ZodNumber>;
    presence_penalty: z.ZodOptional<z.ZodNumber>;
    response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"json_object">;
    }, "strip", z.ZodTypeAny, {
        type: "json_object";
    }, {
        type: "json_object";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"json_schema">;
        json_schema: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
            strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description?: string | undefined;
            schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
            strict?: boolean | null | undefined;
        }, {
            name: string;
            description?: string | undefined;
            schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
            strict?: boolean | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "json_schema";
        json_schema: {
            name: string;
            description?: string | undefined;
            schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
            strict?: boolean | null | undefined;
        };
    }, {
        type: "json_schema";
        json_schema: {
            name: string;
            description?: string | undefined;
            schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
            strict?: boolean | null | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"text">;
    }, "strip", z.ZodTypeAny, {
        type: "text";
    }, {
        type: "text";
    }>, z.ZodNull]>>;
    tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
        type: z.ZodLiteral<"function">;
        function: z.ZodObject<{
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
        }, {
            name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        function: {
            name: string;
        };
        type: "function";
    }, {
        function: {
            name: string;
        };
        type: "function";
    }>]>>;
    function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>]>>;
    n: z.ZodOptional<z.ZodNumber>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
    verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
    top_k: z.ZodOptional<z.ZodNumber>;
    stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
    reasoning_budget: z.ZodOptional<z.ZodNumber>;
    max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
    maxOutputTokens: z.ZodOptional<z.ZodNumber>;
    topP: z.ZodOptional<z.ZodNumber>;
    topK: z.ZodOptional<z.ZodNumber>;
    use_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    max_tokens: number;
    temperature?: number | undefined;
    top_p?: number | undefined;
    max_completion_tokens?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    response_format?: {
        type: "json_object";
    } | {
        type: "json_schema";
        json_schema: {
            name: string;
            description?: string | undefined;
            schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
            strict?: boolean | null | undefined;
        };
    } | {
        type: "text";
    } | null | undefined;
    tool_choice?: "auto" | "none" | "required" | {
        function: {
            name: string;
        };
        type: "function";
    } | undefined;
    function_call?: "auto" | "none" | {
        name: string;
    } | undefined;
    n?: number | undefined;
    stop?: string[] | undefined;
    reasoning_effort?: "none" | "minimal" | "low" | "medium" | "high" | undefined;
    verbosity?: "low" | "medium" | "high" | undefined;
    top_k?: number | undefined;
    stop_sequences?: string[] | undefined;
    reasoning_enabled?: boolean | undefined;
    reasoning_budget?: number | undefined;
    max_tokens_to_sample?: number | undefined;
    maxOutputTokens?: number | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    use_cache?: boolean | undefined;
}, {
    max_tokens: number;
    temperature?: number | undefined;
    top_p?: number | undefined;
    max_completion_tokens?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    response_format?: {
        type: "json_object";
    } | {
        type: "json_schema";
        json_schema: {
            name: string;
            description?: string | undefined;
            schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
            strict?: boolean | null | undefined;
        };
    } | {
        type: "text";
    } | null | undefined;
    tool_choice?: "auto" | "none" | "required" | {
        function: {
            name: string;
        };
        type: "function";
    } | undefined;
    function_call?: "auto" | "none" | {
        name: string;
    } | undefined;
    n?: number | undefined;
    stop?: string[] | undefined;
    reasoning_effort?: "none" | "minimal" | "low" | "medium" | "high" | undefined;
    verbosity?: "low" | "medium" | "high" | undefined;
    top_k?: number | undefined;
    stop_sequences?: string[] | undefined;
    reasoning_enabled?: boolean | undefined;
    reasoning_budget?: number | undefined;
    max_tokens_to_sample?: number | undefined;
    maxOutputTokens?: number | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    use_cache?: boolean | undefined;
}>;
type AnyModelParamsType = z.infer<typeof AnyModelParams>;
declare const ChatCompletionMessageParam: z.ZodUnion<[z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, "many">]>;
    role: z.ZodLiteral<"system">;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "system";
    content: string | {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    name?: string | undefined;
}, {
    role: "system";
    content: string | {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    name?: string | undefined;
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodUnion<[z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, z.ZodObject<{
        image_url: z.ZodObject<{
            url: z.ZodString;
            detail: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"low">, z.ZodLiteral<"high">]>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        }, {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        }>;
        type: z.ZodLiteral<"image_url">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "image_url";
        image_url: {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "image_url";
        image_url: {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, z.ZodObject<{
        file: z.ZodObject<{
            file_data: z.ZodOptional<z.ZodString>;
            filename: z.ZodOptional<z.ZodString>;
            file_id: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        }, {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        }>;
        type: z.ZodLiteral<"file">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "file";
        file: {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "file";
        file: {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>]>, "many">]>;
    role: z.ZodLiteral<"user">;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "user";
    content: string | ({
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    } | {
        type: "image_url";
        image_url: {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    } | {
        type: "file";
        file: {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    })[];
    name?: string | undefined;
}, {
    role: "user";
    content: string | ({
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    } | {
        type: "image_url";
        image_url: {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    } | {
        type: "file";
        file: {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    })[];
    name?: string | undefined;
}>, z.ZodObject<{
    role: z.ZodLiteral<"assistant">;
    content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, "many">, z.ZodNull]>>;
    function_call: z.ZodOptional<z.ZodObject<{
        arguments: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        arguments: string;
    }, {
        name: string;
        arguments: string;
    }>>;
    name: z.ZodOptional<z.ZodString>;
    tool_calls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        function: z.ZodObject<{
            arguments: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            arguments: string;
        }, {
            name: string;
            arguments: string;
        }>;
        type: z.ZodLiteral<"function">;
    }, "strip", z.ZodTypeAny, {
        function: {
            name: string;
            arguments: string;
        };
        type: "function";
        id: string;
    }, {
        function: {
            name: string;
            arguments: string;
        };
        type: "function";
        id: string;
    }>, "many">>;
    reasoning: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id?: string | undefined;
        content?: string | undefined;
    }, {
        id?: string | undefined;
        content?: string | undefined;
    }>, "many">>;
    reasoning_signature: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "assistant";
    name?: string | undefined;
    function_call?: {
        name: string;
        arguments: string;
    } | undefined;
    content?: string | {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[] | null | undefined;
    tool_calls?: {
        function: {
            name: string;
            arguments: string;
        };
        type: "function";
        id: string;
    }[] | undefined;
    reasoning?: {
        id?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    reasoning_signature?: string | undefined;
}, {
    role: "assistant";
    name?: string | undefined;
    function_call?: {
        name: string;
        arguments: string;
    } | undefined;
    content?: string | {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[] | null | undefined;
    tool_calls?: {
        function: {
            name: string;
            arguments: string;
        };
        type: "function";
        id: string;
    }[] | undefined;
    reasoning?: {
        id?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    reasoning_signature?: string | undefined;
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, "many">]>;
    role: z.ZodLiteral<"tool">;
    tool_call_id: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "tool";
    content: string | {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    tool_call_id: string;
}, {
    role: "tool";
    content: string | {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    tool_call_id?: string | undefined;
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    name: z.ZodString;
    role: z.ZodLiteral<"function">;
}, "strip", z.ZodTypeAny, {
    role: "function";
    name: string;
    content: string | null;
}, {
    role: "function";
    name: string;
    content: string | null;
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, "many">]>;
    role: z.ZodLiteral<"developer">;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "developer";
    content: string | {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    name?: string | undefined;
}, {
    role: "developer";
    content: string | {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    name?: string | undefined;
}>, z.ZodObject<{
    role: z.ZodLiteral<"model">;
    content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    role: "model";
    content?: string | null | undefined;
}, {
    role: "model";
    content?: string | null | undefined;
}>]>;
type ChatCompletionMessageParamType = z.infer<typeof ChatCompletionMessageParam>;
declare const ChatCompletionOpenAIMessageParam: z.ZodUnion<[z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, "many">]>;
    role: z.ZodLiteral<"system">;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "system";
    content: string | {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    name?: string | undefined;
}, {
    role: "system";
    content: string | {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    name?: string | undefined;
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodUnion<[z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, z.ZodObject<{
        image_url: z.ZodObject<{
            url: z.ZodString;
            detail: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"low">, z.ZodLiteral<"high">]>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        }, {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        }>;
        type: z.ZodLiteral<"image_url">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "image_url";
        image_url: {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "image_url";
        image_url: {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, z.ZodObject<{
        file: z.ZodObject<{
            file_data: z.ZodOptional<z.ZodString>;
            filename: z.ZodOptional<z.ZodString>;
            file_id: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        }, {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        }>;
        type: z.ZodLiteral<"file">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "file";
        file: {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "file";
        file: {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>]>, "many">]>;
    role: z.ZodLiteral<"user">;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "user";
    content: string | ({
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    } | {
        type: "image_url";
        image_url: {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    } | {
        type: "file";
        file: {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    })[];
    name?: string | undefined;
}, {
    role: "user";
    content: string | ({
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    } | {
        type: "image_url";
        image_url: {
            url: string;
            detail?: "auto" | "low" | "high" | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    } | {
        type: "file";
        file: {
            filename?: string | undefined;
            file_data?: string | undefined;
            file_id?: string | undefined;
        };
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    })[];
    name?: string | undefined;
}>, z.ZodObject<{
    role: z.ZodLiteral<"assistant">;
    content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, "many">, z.ZodNull]>>;
    function_call: z.ZodOptional<z.ZodObject<{
        arguments: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        arguments: string;
    }, {
        name: string;
        arguments: string;
    }>>;
    name: z.ZodOptional<z.ZodString>;
    tool_calls: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        function: z.ZodObject<{
            arguments: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            arguments: string;
        }, {
            name: string;
            arguments: string;
        }>;
        type: z.ZodLiteral<"function">;
    }, "strip", z.ZodTypeAny, {
        function: {
            name: string;
            arguments: string;
        };
        type: "function";
        id: string;
    }, {
        function: {
            name: string;
            arguments: string;
        };
        type: "function";
        id: string;
    }>, "many">>;
    reasoning: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id?: string | undefined;
        content?: string | undefined;
    }, {
        id?: string | undefined;
        content?: string | undefined;
    }>, "many">>;
    reasoning_signature: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "assistant";
    name?: string | undefined;
    function_call?: {
        name: string;
        arguments: string;
    } | undefined;
    content?: string | {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[] | null | undefined;
    tool_calls?: {
        function: {
            name: string;
            arguments: string;
        };
        type: "function";
        id: string;
    }[] | undefined;
    reasoning?: {
        id?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    reasoning_signature?: string | undefined;
}, {
    role: "assistant";
    name?: string | undefined;
    function_call?: {
        name: string;
        arguments: string;
    } | undefined;
    content?: string | {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[] | null | undefined;
    tool_calls?: {
        function: {
            name: string;
            arguments: string;
        };
        type: "function";
        id: string;
    }[] | undefined;
    reasoning?: {
        id?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    reasoning_signature?: string | undefined;
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, "many">]>;
    role: z.ZodLiteral<"tool">;
    tool_call_id: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "tool";
    content: string | {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    tool_call_id: string;
}, {
    role: "tool";
    content: string | {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    tool_call_id?: string | undefined;
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    name: z.ZodString;
    role: z.ZodLiteral<"function">;
}, "strip", z.ZodTypeAny, {
    role: "function";
    name: string;
    content: string | null;
}, {
    role: "function";
    name: string;
    content: string | null;
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
        text: z.ZodDefault<z.ZodString>;
        type: z.ZodLiteral<"text">;
        cache_control: z.ZodOptional<z.ZodObject<{
            type: z.ZodLiteral<"ephemeral">;
            ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }, {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }, {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }>, "many">]>;
    role: z.ZodLiteral<"developer">;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "developer";
    content: string | {
        type: "text";
        text: string;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    name?: string | undefined;
}, {
    role: "developer";
    content: string | {
        type: "text";
        text?: string | undefined;
        cache_control?: {
            type: "ephemeral";
            ttl?: "5m" | "1h" | undefined;
        } | undefined;
    }[];
    name?: string | undefined;
}>]>;
type ChatCompletionOpenAIMessageParamType = z.infer<typeof ChatCompletionOpenAIMessageParam>;
declare const ChatCompletionTool: z.ZodObject<{
    function: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description?: string | undefined;
        parameters?: z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
    }, {
        name: string;
        description?: string | undefined;
        parameters?: z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
    }>;
    type: z.ZodLiteral<"function">;
}, "strip", z.ZodTypeAny, {
    function: {
        name: string;
        description?: string | undefined;
        parameters?: z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
    };
    type: "function";
}, {
    function: {
        name: string;
        description?: string | undefined;
        parameters?: z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
    };
    type: "function";
}>;
type ChatCompletionToolType = z.infer<typeof ChatCompletionTool>;
declare const DatasetSnapshot: z.ZodObject<{
    id: z.ZodString;
    dataset_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodUnion<[z.ZodString, z.ZodNull]>;
    xact_id: z.ZodString;
    created: z.ZodUnion<[z.ZodString, z.ZodNull]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created: string | null;
    name: string;
    description: string | null;
    dataset_id: string;
    xact_id: string;
}, {
    id: string;
    created: string | null;
    name: string;
    description: string | null;
    dataset_id: string;
    xact_id: string;
}>;
type DatasetSnapshotType = z.infer<typeof DatasetSnapshot>;
declare const PromptBlockData: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"chat">;
    messages: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
            text: z.ZodDefault<z.ZodString>;
            type: z.ZodLiteral<"text">;
            cache_control: z.ZodOptional<z.ZodObject<{
                type: z.ZodLiteral<"ephemeral">;
                ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
            }, "strip", z.ZodTypeAny, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }, {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }>, "many">]>;
        role: z.ZodLiteral<"system">;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        role: "system";
        content: string | {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        name?: string | undefined;
    }, {
        role: "system";
        content: string | {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        name?: string | undefined;
    }>, z.ZodObject<{
        content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodUnion<[z.ZodObject<{
            text: z.ZodDefault<z.ZodString>;
            type: z.ZodLiteral<"text">;
            cache_control: z.ZodOptional<z.ZodObject<{
                type: z.ZodLiteral<"ephemeral">;
                ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
            }, "strip", z.ZodTypeAny, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }, {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }>, z.ZodObject<{
            image_url: z.ZodObject<{
                url: z.ZodString;
                detail: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"low">, z.ZodLiteral<"high">]>>;
            }, "strip", z.ZodTypeAny, {
                url: string;
                detail?: "auto" | "low" | "high" | undefined;
            }, {
                url: string;
                detail?: "auto" | "low" | "high" | undefined;
            }>;
            type: z.ZodLiteral<"image_url">;
            cache_control: z.ZodOptional<z.ZodObject<{
                type: z.ZodLiteral<"ephemeral">;
                ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
            }, "strip", z.ZodTypeAny, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "image_url";
            image_url: {
                url: string;
                detail?: "auto" | "low" | "high" | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }, {
            type: "image_url";
            image_url: {
                url: string;
                detail?: "auto" | "low" | "high" | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }>, z.ZodObject<{
            file: z.ZodObject<{
                file_data: z.ZodOptional<z.ZodString>;
                filename: z.ZodOptional<z.ZodString>;
                file_id: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                filename?: string | undefined;
                file_data?: string | undefined;
                file_id?: string | undefined;
            }, {
                filename?: string | undefined;
                file_data?: string | undefined;
                file_id?: string | undefined;
            }>;
            type: z.ZodLiteral<"file">;
            cache_control: z.ZodOptional<z.ZodObject<{
                type: z.ZodLiteral<"ephemeral">;
                ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
            }, "strip", z.ZodTypeAny, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "file";
            file: {
                filename?: string | undefined;
                file_data?: string | undefined;
                file_id?: string | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }, {
            type: "file";
            file: {
                filename?: string | undefined;
                file_data?: string | undefined;
                file_id?: string | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }>]>, "many">]>;
        role: z.ZodLiteral<"user">;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        role: "user";
        content: string | ({
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        } | {
            type: "image_url";
            image_url: {
                url: string;
                detail?: "auto" | "low" | "high" | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        } | {
            type: "file";
            file: {
                filename?: string | undefined;
                file_data?: string | undefined;
                file_id?: string | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        })[];
        name?: string | undefined;
    }, {
        role: "user";
        content: string | ({
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        } | {
            type: "image_url";
            image_url: {
                url: string;
                detail?: "auto" | "low" | "high" | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        } | {
            type: "file";
            file: {
                filename?: string | undefined;
                file_data?: string | undefined;
                file_id?: string | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        })[];
        name?: string | undefined;
    }>, z.ZodObject<{
        role: z.ZodLiteral<"assistant">;
        content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
            text: z.ZodDefault<z.ZodString>;
            type: z.ZodLiteral<"text">;
            cache_control: z.ZodOptional<z.ZodObject<{
                type: z.ZodLiteral<"ephemeral">;
                ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
            }, "strip", z.ZodTypeAny, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }, {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }>, "many">, z.ZodNull]>>;
        function_call: z.ZodOptional<z.ZodObject<{
            arguments: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            arguments: string;
        }, {
            name: string;
            arguments: string;
        }>>;
        name: z.ZodOptional<z.ZodString>;
        tool_calls: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            function: z.ZodObject<{
                arguments: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                arguments: string;
            }, {
                name: string;
                arguments: string;
            }>;
            type: z.ZodLiteral<"function">;
        }, "strip", z.ZodTypeAny, {
            function: {
                name: string;
                arguments: string;
            };
            type: "function";
            id: string;
        }, {
            function: {
                name: string;
                arguments: string;
            };
            type: "function";
            id: string;
        }>, "many">>;
        reasoning: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id?: string | undefined;
            content?: string | undefined;
        }, {
            id?: string | undefined;
            content?: string | undefined;
        }>, "many">>;
        reasoning_signature: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        role: "assistant";
        name?: string | undefined;
        function_call?: {
            name: string;
            arguments: string;
        } | undefined;
        content?: string | {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[] | null | undefined;
        tool_calls?: {
            function: {
                name: string;
                arguments: string;
            };
            type: "function";
            id: string;
        }[] | undefined;
        reasoning?: {
            id?: string | undefined;
            content?: string | undefined;
        }[] | undefined;
        reasoning_signature?: string | undefined;
    }, {
        role: "assistant";
        name?: string | undefined;
        function_call?: {
            name: string;
            arguments: string;
        } | undefined;
        content?: string | {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[] | null | undefined;
        tool_calls?: {
            function: {
                name: string;
                arguments: string;
            };
            type: "function";
            id: string;
        }[] | undefined;
        reasoning?: {
            id?: string | undefined;
            content?: string | undefined;
        }[] | undefined;
        reasoning_signature?: string | undefined;
    }>, z.ZodObject<{
        content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
            text: z.ZodDefault<z.ZodString>;
            type: z.ZodLiteral<"text">;
            cache_control: z.ZodOptional<z.ZodObject<{
                type: z.ZodLiteral<"ephemeral">;
                ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
            }, "strip", z.ZodTypeAny, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }, {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }>, "many">]>;
        role: z.ZodLiteral<"tool">;
        tool_call_id: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        role: "tool";
        content: string | {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        tool_call_id: string;
    }, {
        role: "tool";
        content: string | {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        tool_call_id?: string | undefined;
    }>, z.ZodObject<{
        content: z.ZodUnion<[z.ZodString, z.ZodNull]>;
        name: z.ZodString;
        role: z.ZodLiteral<"function">;
    }, "strip", z.ZodTypeAny, {
        role: "function";
        name: string;
        content: string | null;
    }, {
        role: "function";
        name: string;
        content: string | null;
    }>, z.ZodObject<{
        content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
            text: z.ZodDefault<z.ZodString>;
            type: z.ZodLiteral<"text">;
            cache_control: z.ZodOptional<z.ZodObject<{
                type: z.ZodLiteral<"ephemeral">;
                ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
            }, "strip", z.ZodTypeAny, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }, {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }, {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }>, "many">]>;
        role: z.ZodLiteral<"developer">;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        role: "developer";
        content: string | {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        name?: string | undefined;
    }, {
        role: "developer";
        content: string | {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        name?: string | undefined;
    }>, z.ZodObject<{
        role: z.ZodLiteral<"model">;
        content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        role: "model";
        content?: string | null | undefined;
    }, {
        role: "model";
        content?: string | null | undefined;
    }>]>, "many">;
    tools: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "chat";
    messages: ({
        role: "system";
        content: string | {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        name?: string | undefined;
    } | {
        role: "user";
        content: string | ({
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        } | {
            type: "image_url";
            image_url: {
                url: string;
                detail?: "auto" | "low" | "high" | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        } | {
            type: "file";
            file: {
                filename?: string | undefined;
                file_data?: string | undefined;
                file_id?: string | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        })[];
        name?: string | undefined;
    } | {
        role: "assistant";
        name?: string | undefined;
        function_call?: {
            name: string;
            arguments: string;
        } | undefined;
        content?: string | {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[] | null | undefined;
        tool_calls?: {
            function: {
                name: string;
                arguments: string;
            };
            type: "function";
            id: string;
        }[] | undefined;
        reasoning?: {
            id?: string | undefined;
            content?: string | undefined;
        }[] | undefined;
        reasoning_signature?: string | undefined;
    } | {
        role: "tool";
        content: string | {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        tool_call_id: string;
    } | {
        role: "function";
        name: string;
        content: string | null;
    } | {
        role: "developer";
        content: string | {
            type: "text";
            text: string;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        name?: string | undefined;
    } | {
        role: "model";
        content?: string | null | undefined;
    })[];
    tools?: string | undefined;
}, {
    type: "chat";
    messages: ({
        role: "system";
        content: string | {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        name?: string | undefined;
    } | {
        role: "user";
        content: string | ({
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        } | {
            type: "image_url";
            image_url: {
                url: string;
                detail?: "auto" | "low" | "high" | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        } | {
            type: "file";
            file: {
                filename?: string | undefined;
                file_data?: string | undefined;
                file_id?: string | undefined;
            };
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        })[];
        name?: string | undefined;
    } | {
        role: "assistant";
        name?: string | undefined;
        function_call?: {
            name: string;
            arguments: string;
        } | undefined;
        content?: string | {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[] | null | undefined;
        tool_calls?: {
            function: {
                name: string;
                arguments: string;
            };
            type: "function";
            id: string;
        }[] | undefined;
        reasoning?: {
            id?: string | undefined;
            content?: string | undefined;
        }[] | undefined;
        reasoning_signature?: string | undefined;
    } | {
        role: "tool";
        content: string | {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        tool_call_id?: string | undefined;
    } | {
        role: "function";
        name: string;
        content: string | null;
    } | {
        role: "developer";
        content: string | {
            type: "text";
            text?: string | undefined;
            cache_control?: {
                type: "ephemeral";
                ttl?: "5m" | "1h" | undefined;
            } | undefined;
        }[];
        name?: string | undefined;
    } | {
        role: "model";
        content?: string | null | undefined;
    })[];
    tools?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"completion">;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "completion";
    content: string;
}, {
    type: "completion";
    content: string;
}>]>;
type PromptBlockDataType = z.infer<typeof PromptBlockData>;
declare const PromptData: z.ZodObject<{
    prompt: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"chat">;
        messages: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
                text: z.ZodDefault<z.ZodString>;
                type: z.ZodLiteral<"text">;
                cache_control: z.ZodOptional<z.ZodObject<{
                    type: z.ZodLiteral<"ephemeral">;
                    ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                }, "strip", z.ZodTypeAny, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }, {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }>, "many">]>;
            role: z.ZodLiteral<"system">;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            role: "system";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        }, {
            role: "system";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        }>, z.ZodObject<{
            content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodUnion<[z.ZodObject<{
                text: z.ZodDefault<z.ZodString>;
                type: z.ZodLiteral<"text">;
                cache_control: z.ZodOptional<z.ZodObject<{
                    type: z.ZodLiteral<"ephemeral">;
                    ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                }, "strip", z.ZodTypeAny, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }, {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }>, z.ZodObject<{
                image_url: z.ZodObject<{
                    url: z.ZodString;
                    detail: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"low">, z.ZodLiteral<"high">]>>;
                }, "strip", z.ZodTypeAny, {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                }, {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                }>;
                type: z.ZodLiteral<"image_url">;
                cache_control: z.ZodOptional<z.ZodObject<{
                    type: z.ZodLiteral<"ephemeral">;
                    ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                }, "strip", z.ZodTypeAny, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "image_url";
                image_url: {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }, {
                type: "image_url";
                image_url: {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }>, z.ZodObject<{
                file: z.ZodObject<{
                    file_data: z.ZodOptional<z.ZodString>;
                    filename: z.ZodOptional<z.ZodString>;
                    file_id: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                }, {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                }>;
                type: z.ZodLiteral<"file">;
                cache_control: z.ZodOptional<z.ZodObject<{
                    type: z.ZodLiteral<"ephemeral">;
                    ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                }, "strip", z.ZodTypeAny, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "file";
                file: {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }, {
                type: "file";
                file: {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }>]>, "many">]>;
            role: z.ZodLiteral<"user">;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            role: "user";
            content: string | ({
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "file";
                file: {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            })[];
            name?: string | undefined;
        }, {
            role: "user";
            content: string | ({
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "file";
                file: {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            })[];
            name?: string | undefined;
        }>, z.ZodObject<{
            role: z.ZodLiteral<"assistant">;
            content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
                text: z.ZodDefault<z.ZodString>;
                type: z.ZodLiteral<"text">;
                cache_control: z.ZodOptional<z.ZodObject<{
                    type: z.ZodLiteral<"ephemeral">;
                    ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                }, "strip", z.ZodTypeAny, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }, {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }>, "many">, z.ZodNull]>>;
            function_call: z.ZodOptional<z.ZodObject<{
                arguments: z.ZodString;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                arguments: string;
            }, {
                name: string;
                arguments: string;
            }>>;
            name: z.ZodOptional<z.ZodString>;
            tool_calls: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                function: z.ZodObject<{
                    arguments: z.ZodString;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    arguments: string;
                }, {
                    name: string;
                    arguments: string;
                }>;
                type: z.ZodLiteral<"function">;
            }, "strip", z.ZodTypeAny, {
                function: {
                    name: string;
                    arguments: string;
                };
                type: "function";
                id: string;
            }, {
                function: {
                    name: string;
                    arguments: string;
                };
                type: "function";
                id: string;
            }>, "many">>;
            reasoning: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                content: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                content?: string | undefined;
            }, {
                id?: string | undefined;
                content?: string | undefined;
            }>, "many">>;
            reasoning_signature: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            role: "assistant";
            name?: string | undefined;
            function_call?: {
                name: string;
                arguments: string;
            } | undefined;
            content?: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[] | null | undefined;
            tool_calls?: {
                function: {
                    name: string;
                    arguments: string;
                };
                type: "function";
                id: string;
            }[] | undefined;
            reasoning?: {
                id?: string | undefined;
                content?: string | undefined;
            }[] | undefined;
            reasoning_signature?: string | undefined;
        }, {
            role: "assistant";
            name?: string | undefined;
            function_call?: {
                name: string;
                arguments: string;
            } | undefined;
            content?: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[] | null | undefined;
            tool_calls?: {
                function: {
                    name: string;
                    arguments: string;
                };
                type: "function";
                id: string;
            }[] | undefined;
            reasoning?: {
                id?: string | undefined;
                content?: string | undefined;
            }[] | undefined;
            reasoning_signature?: string | undefined;
        }>, z.ZodObject<{
            content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
                text: z.ZodDefault<z.ZodString>;
                type: z.ZodLiteral<"text">;
                cache_control: z.ZodOptional<z.ZodObject<{
                    type: z.ZodLiteral<"ephemeral">;
                    ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                }, "strip", z.ZodTypeAny, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }, {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }>, "many">]>;
            role: z.ZodLiteral<"tool">;
            tool_call_id: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            role: "tool";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            tool_call_id: string;
        }, {
            role: "tool";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            tool_call_id?: string | undefined;
        }>, z.ZodObject<{
            content: z.ZodUnion<[z.ZodString, z.ZodNull]>;
            name: z.ZodString;
            role: z.ZodLiteral<"function">;
        }, "strip", z.ZodTypeAny, {
            role: "function";
            name: string;
            content: string | null;
        }, {
            role: "function";
            name: string;
            content: string | null;
        }>, z.ZodObject<{
            content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
                text: z.ZodDefault<z.ZodString>;
                type: z.ZodLiteral<"text">;
                cache_control: z.ZodOptional<z.ZodObject<{
                    type: z.ZodLiteral<"ephemeral">;
                    ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                }, "strip", z.ZodTypeAny, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }, {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }, {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }>, "many">]>;
            role: z.ZodLiteral<"developer">;
            name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            role: "developer";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        }, {
            role: "developer";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        }>, z.ZodObject<{
            role: z.ZodLiteral<"model">;
            content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            role: "model";
            content?: string | null | undefined;
        }, {
            role: "model";
            content?: string | null | undefined;
        }>]>, "many">;
        tools: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "chat";
        messages: ({
            role: "system";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        } | {
            role: "user";
            content: string | ({
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "file";
                file: {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            })[];
            name?: string | undefined;
        } | {
            role: "assistant";
            name?: string | undefined;
            function_call?: {
                name: string;
                arguments: string;
            } | undefined;
            content?: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[] | null | undefined;
            tool_calls?: {
                function: {
                    name: string;
                    arguments: string;
                };
                type: "function";
                id: string;
            }[] | undefined;
            reasoning?: {
                id?: string | undefined;
                content?: string | undefined;
            }[] | undefined;
            reasoning_signature?: string | undefined;
        } | {
            role: "tool";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            tool_call_id: string;
        } | {
            role: "function";
            name: string;
            content: string | null;
        } | {
            role: "developer";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        } | {
            role: "model";
            content?: string | null | undefined;
        })[];
        tools?: string | undefined;
    }, {
        type: "chat";
        messages: ({
            role: "system";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        } | {
            role: "user";
            content: string | ({
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "file";
                file: {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            })[];
            name?: string | undefined;
        } | {
            role: "assistant";
            name?: string | undefined;
            function_call?: {
                name: string;
                arguments: string;
            } | undefined;
            content?: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[] | null | undefined;
            tool_calls?: {
                function: {
                    name: string;
                    arguments: string;
                };
                type: "function";
                id: string;
            }[] | undefined;
            reasoning?: {
                id?: string | undefined;
                content?: string | undefined;
            }[] | undefined;
            reasoning_signature?: string | undefined;
        } | {
            role: "tool";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            tool_call_id?: string | undefined;
        } | {
            role: "function";
            name: string;
            content: string | null;
        } | {
            role: "developer";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        } | {
            role: "model";
            content?: string | null | undefined;
        })[];
        tools?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"completion">;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "completion";
        content: string;
    }, {
        type: "completion";
        content: string;
    }>, z.ZodNull]>>;
    options: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        model: z.ZodOptional<z.ZodString>;
        params: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            top_p: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodOptional<z.ZodNumber>;
            max_completion_tokens: z.ZodOptional<z.ZodNumber>;
            frequency_penalty: z.ZodOptional<z.ZodNumber>;
            presence_penalty: z.ZodOptional<z.ZodNumber>;
            response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<"json_object">;
            }, "strip", z.ZodTypeAny, {
                type: "json_object";
            }, {
                type: "json_object";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"json_schema">;
                json_schema: z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                    strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                type: "text";
            }, {
                type: "text";
            }>, z.ZodNull]>>;
            tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                type: z.ZodLiteral<"function">;
                function: z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                function: {
                    name: string;
                };
                type: "function";
            }, {
                function: {
                    name: string;
                };
                type: "function";
            }>]>>;
            function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>]>>;
            n: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
            verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            top_p: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodOptional<z.ZodNumber>;
            max_completion_tokens: z.ZodOptional<z.ZodNumber>;
            frequency_penalty: z.ZodOptional<z.ZodNumber>;
            presence_penalty: z.ZodOptional<z.ZodNumber>;
            response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<"json_object">;
            }, "strip", z.ZodTypeAny, {
                type: "json_object";
            }, {
                type: "json_object";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"json_schema">;
                json_schema: z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                    strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                type: "text";
            }, {
                type: "text";
            }>, z.ZodNull]>>;
            tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                type: z.ZodLiteral<"function">;
                function: z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                function: {
                    name: string;
                };
                type: "function";
            }, {
                function: {
                    name: string;
                };
                type: "function";
            }>]>>;
            function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>]>>;
            n: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
            verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            top_p: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodOptional<z.ZodNumber>;
            max_completion_tokens: z.ZodOptional<z.ZodNumber>;
            frequency_penalty: z.ZodOptional<z.ZodNumber>;
            presence_penalty: z.ZodOptional<z.ZodNumber>;
            response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<"json_object">;
            }, "strip", z.ZodTypeAny, {
                type: "json_object";
            }, {
                type: "json_object";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"json_schema">;
                json_schema: z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                    strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                type: "text";
            }, {
                type: "text";
            }>, z.ZodNull]>>;
            tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                type: z.ZodLiteral<"function">;
                function: z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                function: {
                    name: string;
                };
                type: "function";
            }, {
                function: {
                    name: string;
                };
                type: "function";
            }>]>>;
            function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>]>>;
            n: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
            verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodNumber;
            temperature: z.ZodNumber;
            top_p: z.ZodOptional<z.ZodNumber>;
            top_k: z.ZodOptional<z.ZodNumber>;
            stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodNumber;
            temperature: z.ZodNumber;
            top_p: z.ZodOptional<z.ZodNumber>;
            top_k: z.ZodOptional<z.ZodNumber>;
            stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodNumber;
            temperature: z.ZodNumber;
            top_p: z.ZodOptional<z.ZodNumber>;
            top_k: z.ZodOptional<z.ZodNumber>;
            stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>]>>;
        position: z.ZodOptional<z.ZodString>;
        endpoint_name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        params?: z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            top_p: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodOptional<z.ZodNumber>;
            max_completion_tokens: z.ZodOptional<z.ZodNumber>;
            frequency_penalty: z.ZodOptional<z.ZodNumber>;
            presence_penalty: z.ZodOptional<z.ZodNumber>;
            response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<"json_object">;
            }, "strip", z.ZodTypeAny, {
                type: "json_object";
            }, {
                type: "json_object";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"json_schema">;
                json_schema: z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                    strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                type: "text";
            }, {
                type: "text";
            }>, z.ZodNull]>>;
            tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                type: z.ZodLiteral<"function">;
                function: z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                function: {
                    name: string;
                };
                type: "function";
            }, {
                function: {
                    name: string;
                };
                type: "function";
            }>]>>;
            function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>]>>;
            n: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
            verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodNumber;
            temperature: z.ZodNumber;
            top_p: z.ZodOptional<z.ZodNumber>;
            top_k: z.ZodOptional<z.ZodNumber>;
            stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        model?: string | undefined;
        position?: string | undefined;
        endpoint_name?: string | null | undefined;
    }, {
        params?: z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            top_p: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodOptional<z.ZodNumber>;
            max_completion_tokens: z.ZodOptional<z.ZodNumber>;
            frequency_penalty: z.ZodOptional<z.ZodNumber>;
            presence_penalty: z.ZodOptional<z.ZodNumber>;
            response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<"json_object">;
            }, "strip", z.ZodTypeAny, {
                type: "json_object";
            }, {
                type: "json_object";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"json_schema">;
                json_schema: z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                    strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                type: "text";
            }, {
                type: "text";
            }>, z.ZodNull]>>;
            tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                type: z.ZodLiteral<"function">;
                function: z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                function: {
                    name: string;
                };
                type: "function";
            }, {
                function: {
                    name: string;
                };
                type: "function";
            }>]>>;
            function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>]>>;
            n: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
            verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodNumber;
            temperature: z.ZodNumber;
            top_p: z.ZodOptional<z.ZodNumber>;
            top_k: z.ZodOptional<z.ZodNumber>;
            stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        model?: string | undefined;
        position?: string | undefined;
        endpoint_name?: string | null | undefined;
    }>, z.ZodNull]>>;
    parser: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"llm_classifier">;
        use_cot: z.ZodBoolean;
        choice_scores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        choice: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        allow_no_match: z.ZodOptional<z.ZodBoolean>;
        allow_skip: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "llm_classifier";
        use_cot: boolean;
        choice_scores?: Record<string, number> | undefined;
        choice?: string[] | undefined;
        allow_no_match?: boolean | undefined;
        allow_skip?: boolean | undefined;
    }, {
        type: "llm_classifier";
        use_cot: boolean;
        choice_scores?: Record<string, number> | undefined;
        choice?: string[] | undefined;
        allow_no_match?: boolean | undefined;
        allow_skip?: boolean | undefined;
    }>, z.ZodNull]>>;
    preprocessor: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"function">;
        id: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "function";
        id: string;
        version?: string | undefined;
    }, {
        type: "function";
        id: string;
        version?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"global">;
        name: z.ZodString;
        function_type: z.ZodDefault<z.ZodOptional<z.ZodLiteral<"preprocessor">>>;
    }, "strip", z.ZodTypeAny, {
        type: "global";
        name: string;
        function_type: "preprocessor";
    }, {
        type: "global";
        name: string;
        function_type?: "preprocessor" | undefined;
    }>, z.ZodNull]>>;
    tool_functions: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"function">;
        id: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "function";
        id: string;
        version?: string | undefined;
    }, {
        type: "function";
        id: string;
        version?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"global">;
        name: z.ZodString;
        function_type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["llm", "scorer", "task", "tool", "custom_view", "preprocessor", "facet", "classifier", "tag", "parameters", "sandbox"]>>>;
    }, "strip", z.ZodTypeAny, {
        type: "global";
        name: string;
        function_type: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox";
    }, {
        type: "global";
        name: string;
        function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | undefined;
    }>]>, "many">, z.ZodNull]>>;
    template_format: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["mustache", "nunjucks", "none"]>, z.ZodNull]>>;
    mcp: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"id">;
        id: z.ZodString;
        is_disabled: z.ZodOptional<z.ZodBoolean>;
        enabled_tools: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        type: "id";
        id: string;
        is_disabled?: boolean | undefined;
        enabled_tools?: string[] | null | undefined;
    }, {
        type: "id";
        id: string;
        is_disabled?: boolean | undefined;
        enabled_tools?: string[] | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"url">;
        url: z.ZodString;
        is_disabled: z.ZodOptional<z.ZodBoolean>;
        enabled_tools: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        type: "url";
        url: string;
        is_disabled?: boolean | undefined;
        enabled_tools?: string[] | null | undefined;
    }, {
        type: "url";
        url: string;
        is_disabled?: boolean | undefined;
        enabled_tools?: string[] | null | undefined;
    }>]>>, z.ZodNull]>>;
    origin: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        prompt_id: z.ZodOptional<z.ZodString>;
        project_id: z.ZodOptional<z.ZodString>;
        prompt_version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        project_id?: string | undefined;
        prompt_id?: string | undefined;
        prompt_version?: string | undefined;
    }, {
        project_id?: string | undefined;
        prompt_id?: string | undefined;
        prompt_version?: string | undefined;
    }>, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    options?: {
        params?: z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            top_p: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodOptional<z.ZodNumber>;
            max_completion_tokens: z.ZodOptional<z.ZodNumber>;
            frequency_penalty: z.ZodOptional<z.ZodNumber>;
            presence_penalty: z.ZodOptional<z.ZodNumber>;
            response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<"json_object">;
            }, "strip", z.ZodTypeAny, {
                type: "json_object";
            }, {
                type: "json_object";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"json_schema">;
                json_schema: z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                    strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                type: "text";
            }, {
                type: "text";
            }>, z.ZodNull]>>;
            tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                type: z.ZodLiteral<"function">;
                function: z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                function: {
                    name: string;
                };
                type: "function";
            }, {
                function: {
                    name: string;
                };
                type: "function";
            }>]>>;
            function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>]>>;
            n: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
            verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodNumber;
            temperature: z.ZodNumber;
            top_p: z.ZodOptional<z.ZodNumber>;
            top_k: z.ZodOptional<z.ZodNumber>;
            stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        model?: string | undefined;
        position?: string | undefined;
        endpoint_name?: string | null | undefined;
    } | null | undefined;
    prompt?: {
        type: "chat";
        messages: ({
            role: "system";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        } | {
            role: "user";
            content: string | ({
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "file";
                file: {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            })[];
            name?: string | undefined;
        } | {
            role: "assistant";
            name?: string | undefined;
            function_call?: {
                name: string;
                arguments: string;
            } | undefined;
            content?: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[] | null | undefined;
            tool_calls?: {
                function: {
                    name: string;
                    arguments: string;
                };
                type: "function";
                id: string;
            }[] | undefined;
            reasoning?: {
                id?: string | undefined;
                content?: string | undefined;
            }[] | undefined;
            reasoning_signature?: string | undefined;
        } | {
            role: "tool";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            tool_call_id: string;
        } | {
            role: "function";
            name: string;
            content: string | null;
        } | {
            role: "developer";
            content: string | {
                type: "text";
                text: string;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        } | {
            role: "model";
            content?: string | null | undefined;
        })[];
        tools?: string | undefined;
    } | {
        type: "completion";
        content: string;
    } | null | undefined;
    preprocessor?: {
        type: "function";
        id: string;
        version?: string | undefined;
    } | {
        type: "global";
        name: string;
        function_type: "preprocessor";
    } | null | undefined;
    origin?: {
        project_id?: string | undefined;
        prompt_id?: string | undefined;
        prompt_version?: string | undefined;
    } | null | undefined;
    parser?: {
        type: "llm_classifier";
        use_cot: boolean;
        choice_scores?: Record<string, number> | undefined;
        choice?: string[] | undefined;
        allow_no_match?: boolean | undefined;
        allow_skip?: boolean | undefined;
    } | null | undefined;
    tool_functions?: ({
        type: "function";
        id: string;
        version?: string | undefined;
    } | {
        type: "global";
        name: string;
        function_type: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox";
    })[] | null | undefined;
    template_format?: "none" | "mustache" | "nunjucks" | null | undefined;
    mcp?: Record<string, {
        type: "id";
        id: string;
        is_disabled?: boolean | undefined;
        enabled_tools?: string[] | null | undefined;
    } | {
        type: "url";
        url: string;
        is_disabled?: boolean | undefined;
        enabled_tools?: string[] | null | undefined;
    }> | null | undefined;
}, {
    options?: {
        params?: z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            top_p: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodOptional<z.ZodNumber>;
            max_completion_tokens: z.ZodOptional<z.ZodNumber>;
            frequency_penalty: z.ZodOptional<z.ZodNumber>;
            presence_penalty: z.ZodOptional<z.ZodNumber>;
            response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                type: z.ZodLiteral<"json_object">;
            }, "strip", z.ZodTypeAny, {
                type: "json_object";
            }, {
                type: "json_object";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"json_schema">;
                json_schema: z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                    strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }, {
                type: "json_schema";
                json_schema: {
                    name: string;
                    description?: string | undefined;
                    schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                    strict?: boolean | null | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                type: "text";
            }, {
                type: "text";
            }>, z.ZodNull]>>;
            tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                type: z.ZodLiteral<"function">;
                function: z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                function: {
                    name: string;
                };
                type: "function";
            }, {
                function: {
                    name: string;
                };
                type: "function";
            }>]>>;
            function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
            }, {
                name: string;
            }>]>>;
            n: z.ZodOptional<z.ZodNumber>;
            stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
            verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            max_tokens: z.ZodNumber;
            temperature: z.ZodNumber;
            top_p: z.ZodOptional<z.ZodNumber>;
            top_k: z.ZodOptional<z.ZodNumber>;
            stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            maxOutputTokens: z.ZodOptional<z.ZodNumber>;
            topP: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
            temperature: z.ZodOptional<z.ZodNumber>;
            topK: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
            use_cache: z.ZodOptional<z.ZodBoolean>;
            reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
            reasoning_budget: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough"> | undefined;
        model?: string | undefined;
        position?: string | undefined;
        endpoint_name?: string | null | undefined;
    } | null | undefined;
    prompt?: {
        type: "chat";
        messages: ({
            role: "system";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        } | {
            role: "user";
            content: string | ({
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "image_url";
                image_url: {
                    url: string;
                    detail?: "auto" | "low" | "high" | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            } | {
                type: "file";
                file: {
                    filename?: string | undefined;
                    file_data?: string | undefined;
                    file_id?: string | undefined;
                };
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            })[];
            name?: string | undefined;
        } | {
            role: "assistant";
            name?: string | undefined;
            function_call?: {
                name: string;
                arguments: string;
            } | undefined;
            content?: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[] | null | undefined;
            tool_calls?: {
                function: {
                    name: string;
                    arguments: string;
                };
                type: "function";
                id: string;
            }[] | undefined;
            reasoning?: {
                id?: string | undefined;
                content?: string | undefined;
            }[] | undefined;
            reasoning_signature?: string | undefined;
        } | {
            role: "tool";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            tool_call_id?: string | undefined;
        } | {
            role: "function";
            name: string;
            content: string | null;
        } | {
            role: "developer";
            content: string | {
                type: "text";
                text?: string | undefined;
                cache_control?: {
                    type: "ephemeral";
                    ttl?: "5m" | "1h" | undefined;
                } | undefined;
            }[];
            name?: string | undefined;
        } | {
            role: "model";
            content?: string | null | undefined;
        })[];
        tools?: string | undefined;
    } | {
        type: "completion";
        content: string;
    } | null | undefined;
    preprocessor?: {
        type: "function";
        id: string;
        version?: string | undefined;
    } | {
        type: "global";
        name: string;
        function_type?: "preprocessor" | undefined;
    } | null | undefined;
    origin?: {
        project_id?: string | undefined;
        prompt_id?: string | undefined;
        prompt_version?: string | undefined;
    } | null | undefined;
    parser?: {
        type: "llm_classifier";
        use_cot: boolean;
        choice_scores?: Record<string, number> | undefined;
        choice?: string[] | undefined;
        allow_no_match?: boolean | undefined;
        allow_skip?: boolean | undefined;
    } | null | undefined;
    tool_functions?: ({
        type: "function";
        id: string;
        version?: string | undefined;
    } | {
        type: "global";
        name: string;
        function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | undefined;
    })[] | null | undefined;
    template_format?: "none" | "mustache" | "nunjucks" | null | undefined;
    mcp?: Record<string, {
        type: "id";
        id: string;
        is_disabled?: boolean | undefined;
        enabled_tools?: string[] | null | undefined;
    } | {
        type: "url";
        url: string;
        is_disabled?: boolean | undefined;
        enabled_tools?: string[] | null | undefined;
    }> | null | undefined;
}>;
type PromptDataType = z.infer<typeof PromptData>;
declare const GitMetadataSettings: z.ZodObject<{
    collect: z.ZodEnum<["all", "none", "some"]>;
    fields: z.ZodOptional<z.ZodArray<z.ZodEnum<["commit", "branch", "tag", "dirty", "author_name", "author_email", "commit_message", "commit_time", "git_diff"]>, "many">>;
}, "strip", z.ZodTypeAny, {
    collect: "some" | "none" | "all";
    fields?: ("dirty" | "tag" | "commit" | "branch" | "author_name" | "author_email" | "commit_message" | "commit_time" | "git_diff")[] | undefined;
}, {
    collect: "some" | "none" | "all";
    fields?: ("dirty" | "tag" | "commit" | "branch" | "author_name" | "author_email" | "commit_message" | "commit_time" | "git_diff")[] | undefined;
}>;
type GitMetadataSettingsType = z.infer<typeof GitMetadataSettings>;
declare const ObjectReference$1: z.ZodObject<{
    object_type: z.ZodEnum<["project_logs", "experiment", "dataset", "prompt", "function", "prompt_session"]>;
    object_id: z.ZodString;
    id: z.ZodString;
    _xact_id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    created: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    object_type: "function" | "experiment" | "dataset" | "prompt" | "prompt_session" | "project_logs";
    object_id: string;
    created?: string | null | undefined;
    _xact_id?: string | null | undefined;
}, {
    id: string;
    object_type: "function" | "experiment" | "dataset" | "prompt" | "prompt_session" | "project_logs";
    object_id: string;
    created?: string | null | undefined;
    _xact_id?: string | null | undefined;
}>;
type ObjectReferenceType$1 = z.infer<typeof ObjectReference$1>;
declare const Prompt$1: z.ZodObject<{
    id: z.ZodString;
    _xact_id: z.ZodString;
    project_id: z.ZodString;
    log_id: z.ZodLiteral<"p">;
    org_id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    created: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    prompt_data: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        prompt: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"chat">;
            messages: z.ZodArray<z.ZodUnion<[z.ZodObject<{
                content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
                    text: z.ZodDefault<z.ZodString>;
                    type: z.ZodLiteral<"text">;
                    cache_control: z.ZodOptional<z.ZodObject<{
                        type: z.ZodLiteral<"ephemeral">;
                        ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                    }, "strip", z.ZodTypeAny, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }, {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }>, "many">]>;
                role: z.ZodLiteral<"system">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                role: "system";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            }, {
                role: "system";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            }>, z.ZodObject<{
                content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    text: z.ZodDefault<z.ZodString>;
                    type: z.ZodLiteral<"text">;
                    cache_control: z.ZodOptional<z.ZodObject<{
                        type: z.ZodLiteral<"ephemeral">;
                        ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                    }, "strip", z.ZodTypeAny, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }, {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }>, z.ZodObject<{
                    image_url: z.ZodObject<{
                        url: z.ZodString;
                        detail: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"low">, z.ZodLiteral<"high">]>>;
                    }, "strip", z.ZodTypeAny, {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    }, {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    }>;
                    type: z.ZodLiteral<"image_url">;
                    cache_control: z.ZodOptional<z.ZodObject<{
                        type: z.ZodLiteral<"ephemeral">;
                        ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                    }, "strip", z.ZodTypeAny, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }, {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }>, z.ZodObject<{
                    file: z.ZodObject<{
                        file_data: z.ZodOptional<z.ZodString>;
                        filename: z.ZodOptional<z.ZodString>;
                        file_id: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    }, {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    }>;
                    type: z.ZodLiteral<"file">;
                    cache_control: z.ZodOptional<z.ZodObject<{
                        type: z.ZodLiteral<"ephemeral">;
                        ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                    }, "strip", z.ZodTypeAny, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }, {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }>]>, "many">]>;
                role: z.ZodLiteral<"user">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                role: "user";
                content: string | ({
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                })[];
                name?: string | undefined;
            }, {
                role: "user";
                content: string | ({
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                })[];
                name?: string | undefined;
            }>, z.ZodObject<{
                role: z.ZodLiteral<"assistant">;
                content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
                    text: z.ZodDefault<z.ZodString>;
                    type: z.ZodLiteral<"text">;
                    cache_control: z.ZodOptional<z.ZodObject<{
                        type: z.ZodLiteral<"ephemeral">;
                        ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                    }, "strip", z.ZodTypeAny, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }, {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }>, "many">, z.ZodNull]>>;
                function_call: z.ZodOptional<z.ZodObject<{
                    arguments: z.ZodString;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    arguments: string;
                }, {
                    name: string;
                    arguments: string;
                }>>;
                name: z.ZodOptional<z.ZodString>;
                tool_calls: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    function: z.ZodObject<{
                        arguments: z.ZodString;
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        arguments: string;
                    }, {
                        name: string;
                        arguments: string;
                    }>;
                    type: z.ZodLiteral<"function">;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }, {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }>, "many">>;
                reasoning: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    id: z.ZodOptional<z.ZodString>;
                    content: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    id?: string | undefined;
                    content?: string | undefined;
                }, {
                    id?: string | undefined;
                    content?: string | undefined;
                }>, "many">>;
                reasoning_signature: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                role: "assistant";
                name?: string | undefined;
                function_call?: {
                    name: string;
                    arguments: string;
                } | undefined;
                content?: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[] | null | undefined;
                tool_calls?: {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }[] | undefined;
                reasoning?: {
                    id?: string | undefined;
                    content?: string | undefined;
                }[] | undefined;
                reasoning_signature?: string | undefined;
            }, {
                role: "assistant";
                name?: string | undefined;
                function_call?: {
                    name: string;
                    arguments: string;
                } | undefined;
                content?: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[] | null | undefined;
                tool_calls?: {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }[] | undefined;
                reasoning?: {
                    id?: string | undefined;
                    content?: string | undefined;
                }[] | undefined;
                reasoning_signature?: string | undefined;
            }>, z.ZodObject<{
                content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
                    text: z.ZodDefault<z.ZodString>;
                    type: z.ZodLiteral<"text">;
                    cache_control: z.ZodOptional<z.ZodObject<{
                        type: z.ZodLiteral<"ephemeral">;
                        ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                    }, "strip", z.ZodTypeAny, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }, {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }>, "many">]>;
                role: z.ZodLiteral<"tool">;
                tool_call_id: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                role: "tool";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                tool_call_id: string;
            }, {
                role: "tool";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                tool_call_id?: string | undefined;
            }>, z.ZodObject<{
                content: z.ZodUnion<[z.ZodString, z.ZodNull]>;
                name: z.ZodString;
                role: z.ZodLiteral<"function">;
            }, "strip", z.ZodTypeAny, {
                role: "function";
                name: string;
                content: string | null;
            }, {
                role: "function";
                name: string;
                content: string | null;
            }>, z.ZodObject<{
                content: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodObject<{
                    text: z.ZodDefault<z.ZodString>;
                    type: z.ZodLiteral<"text">;
                    cache_control: z.ZodOptional<z.ZodObject<{
                        type: z.ZodLiteral<"ephemeral">;
                        ttl: z.ZodOptional<z.ZodEnum<["5m", "1h"]>>;
                    }, "strip", z.ZodTypeAny, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }, {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    }>>;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }, {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }>, "many">]>;
                role: z.ZodLiteral<"developer">;
                name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                role: "developer";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            }, {
                role: "developer";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            }>, z.ZodObject<{
                role: z.ZodLiteral<"model">;
                content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            }, "strip", z.ZodTypeAny, {
                role: "model";
                content?: string | null | undefined;
            }, {
                role: "model";
                content?: string | null | undefined;
            }>]>, "many">;
            tools: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "chat";
            messages: ({
                role: "system";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "user";
                content: string | ({
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                })[];
                name?: string | undefined;
            } | {
                role: "assistant";
                name?: string | undefined;
                function_call?: {
                    name: string;
                    arguments: string;
                } | undefined;
                content?: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[] | null | undefined;
                tool_calls?: {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }[] | undefined;
                reasoning?: {
                    id?: string | undefined;
                    content?: string | undefined;
                }[] | undefined;
                reasoning_signature?: string | undefined;
            } | {
                role: "tool";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                tool_call_id: string;
            } | {
                role: "function";
                name: string;
                content: string | null;
            } | {
                role: "developer";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "model";
                content?: string | null | undefined;
            })[];
            tools?: string | undefined;
        }, {
            type: "chat";
            messages: ({
                role: "system";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "user";
                content: string | ({
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                })[];
                name?: string | undefined;
            } | {
                role: "assistant";
                name?: string | undefined;
                function_call?: {
                    name: string;
                    arguments: string;
                } | undefined;
                content?: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[] | null | undefined;
                tool_calls?: {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }[] | undefined;
                reasoning?: {
                    id?: string | undefined;
                    content?: string | undefined;
                }[] | undefined;
                reasoning_signature?: string | undefined;
            } | {
                role: "tool";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                tool_call_id?: string | undefined;
            } | {
                role: "function";
                name: string;
                content: string | null;
            } | {
                role: "developer";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "model";
                content?: string | null | undefined;
            })[];
            tools?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"completion">;
            content: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "completion";
            content: string;
        }, {
            type: "completion";
            content: string;
        }>, z.ZodNull]>>;
        options: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            model: z.ZodOptional<z.ZodString>;
            params: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough">>]>>;
            position: z.ZodOptional<z.ZodString>;
            endpoint_name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            params?: z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            model?: string | undefined;
            position?: string | undefined;
            endpoint_name?: string | null | undefined;
        }, {
            params?: z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            model?: string | undefined;
            position?: string | undefined;
            endpoint_name?: string | null | undefined;
        }>, z.ZodNull]>>;
        parser: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"llm_classifier">;
            use_cot: z.ZodBoolean;
            choice_scores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            choice: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            allow_no_match: z.ZodOptional<z.ZodBoolean>;
            allow_skip: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "llm_classifier";
            use_cot: boolean;
            choice_scores?: Record<string, number> | undefined;
            choice?: string[] | undefined;
            allow_no_match?: boolean | undefined;
            allow_skip?: boolean | undefined;
        }, {
            type: "llm_classifier";
            use_cot: boolean;
            choice_scores?: Record<string, number> | undefined;
            choice?: string[] | undefined;
            allow_no_match?: boolean | undefined;
            allow_skip?: boolean | undefined;
        }>, z.ZodNull]>>;
        preprocessor: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"function">;
            id: z.ZodString;
            version: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "function";
            id: string;
            version?: string | undefined;
        }, {
            type: "function";
            id: string;
            version?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"global">;
            name: z.ZodString;
            function_type: z.ZodDefault<z.ZodOptional<z.ZodLiteral<"preprocessor">>>;
        }, "strip", z.ZodTypeAny, {
            type: "global";
            name: string;
            function_type: "preprocessor";
        }, {
            type: "global";
            name: string;
            function_type?: "preprocessor" | undefined;
        }>, z.ZodNull]>>;
        tool_functions: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"function">;
            id: z.ZodString;
            version: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "function";
            id: string;
            version?: string | undefined;
        }, {
            type: "function";
            id: string;
            version?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"global">;
            name: z.ZodString;
            function_type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["llm", "scorer", "task", "tool", "custom_view", "preprocessor", "facet", "classifier", "tag", "parameters", "sandbox"]>>>;
        }, "strip", z.ZodTypeAny, {
            type: "global";
            name: string;
            function_type: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox";
        }, {
            type: "global";
            name: string;
            function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | undefined;
        }>]>, "many">, z.ZodNull]>>;
        template_format: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["mustache", "nunjucks", "none"]>, z.ZodNull]>>;
        mcp: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"id">;
            id: z.ZodString;
            is_disabled: z.ZodOptional<z.ZodBoolean>;
            enabled_tools: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            type: "id";
            id: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        }, {
            type: "id";
            id: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"url">;
            url: z.ZodString;
            is_disabled: z.ZodOptional<z.ZodBoolean>;
            enabled_tools: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            type: "url";
            url: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        }, {
            type: "url";
            url: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        }>]>>, z.ZodNull]>>;
        origin: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            prompt_id: z.ZodOptional<z.ZodString>;
            project_id: z.ZodOptional<z.ZodString>;
            prompt_version: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            project_id?: string | undefined;
            prompt_id?: string | undefined;
            prompt_version?: string | undefined;
        }, {
            project_id?: string | undefined;
            prompt_id?: string | undefined;
            prompt_version?: string | undefined;
        }>, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        options?: {
            params?: z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            model?: string | undefined;
            position?: string | undefined;
            endpoint_name?: string | null | undefined;
        } | null | undefined;
        prompt?: {
            type: "chat";
            messages: ({
                role: "system";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "user";
                content: string | ({
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                })[];
                name?: string | undefined;
            } | {
                role: "assistant";
                name?: string | undefined;
                function_call?: {
                    name: string;
                    arguments: string;
                } | undefined;
                content?: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[] | null | undefined;
                tool_calls?: {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }[] | undefined;
                reasoning?: {
                    id?: string | undefined;
                    content?: string | undefined;
                }[] | undefined;
                reasoning_signature?: string | undefined;
            } | {
                role: "tool";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                tool_call_id: string;
            } | {
                role: "function";
                name: string;
                content: string | null;
            } | {
                role: "developer";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "model";
                content?: string | null | undefined;
            })[];
            tools?: string | undefined;
        } | {
            type: "completion";
            content: string;
        } | null | undefined;
        preprocessor?: {
            type: "function";
            id: string;
            version?: string | undefined;
        } | {
            type: "global";
            name: string;
            function_type: "preprocessor";
        } | null | undefined;
        origin?: {
            project_id?: string | undefined;
            prompt_id?: string | undefined;
            prompt_version?: string | undefined;
        } | null | undefined;
        parser?: {
            type: "llm_classifier";
            use_cot: boolean;
            choice_scores?: Record<string, number> | undefined;
            choice?: string[] | undefined;
            allow_no_match?: boolean | undefined;
            allow_skip?: boolean | undefined;
        } | null | undefined;
        tool_functions?: ({
            type: "function";
            id: string;
            version?: string | undefined;
        } | {
            type: "global";
            name: string;
            function_type: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox";
        })[] | null | undefined;
        template_format?: "none" | "mustache" | "nunjucks" | null | undefined;
        mcp?: Record<string, {
            type: "id";
            id: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        } | {
            type: "url";
            url: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        }> | null | undefined;
    }, {
        options?: {
            params?: z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            model?: string | undefined;
            position?: string | undefined;
            endpoint_name?: string | null | undefined;
        } | null | undefined;
        prompt?: {
            type: "chat";
            messages: ({
                role: "system";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "user";
                content: string | ({
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                })[];
                name?: string | undefined;
            } | {
                role: "assistant";
                name?: string | undefined;
                function_call?: {
                    name: string;
                    arguments: string;
                } | undefined;
                content?: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[] | null | undefined;
                tool_calls?: {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }[] | undefined;
                reasoning?: {
                    id?: string | undefined;
                    content?: string | undefined;
                }[] | undefined;
                reasoning_signature?: string | undefined;
            } | {
                role: "tool";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                tool_call_id?: string | undefined;
            } | {
                role: "function";
                name: string;
                content: string | null;
            } | {
                role: "developer";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "model";
                content?: string | null | undefined;
            })[];
            tools?: string | undefined;
        } | {
            type: "completion";
            content: string;
        } | null | undefined;
        preprocessor?: {
            type: "function";
            id: string;
            version?: string | undefined;
        } | {
            type: "global";
            name: string;
            function_type?: "preprocessor" | undefined;
        } | null | undefined;
        origin?: {
            project_id?: string | undefined;
            prompt_id?: string | undefined;
            prompt_version?: string | undefined;
        } | null | undefined;
        parser?: {
            type: "llm_classifier";
            use_cot: boolean;
            choice_scores?: Record<string, number> | undefined;
            choice?: string[] | undefined;
            allow_no_match?: boolean | undefined;
            allow_skip?: boolean | undefined;
        } | null | undefined;
        tool_functions?: ({
            type: "function";
            id: string;
            version?: string | undefined;
        } | {
            type: "global";
            name: string;
            function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | undefined;
        })[] | null | undefined;
        template_format?: "none" | "mustache" | "nunjucks" | null | undefined;
        mcp?: Record<string, {
            type: "id";
            id: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        } | {
            type: "url";
            url: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        }> | null | undefined;
    }>, z.ZodNull]>>;
    tags: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodNull]>>;
    metadata: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodNull]>>;
    function_type: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["llm", "scorer", "task", "tool", "custom_view", "preprocessor", "facet", "classifier", "tag", "parameters", "sandbox"]>, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    project_id: string;
    name: string;
    slug: string;
    org_id: string;
    _xact_id: string;
    log_id: "p";
    created?: string | null | undefined;
    description?: string | null | undefined;
    metadata?: z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | null | undefined;
    function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | null | undefined;
    tags?: string[] | null | undefined;
    prompt_data?: {
        options?: {
            params?: z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            model?: string | undefined;
            position?: string | undefined;
            endpoint_name?: string | null | undefined;
        } | null | undefined;
        prompt?: {
            type: "chat";
            messages: ({
                role: "system";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "user";
                content: string | ({
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                })[];
                name?: string | undefined;
            } | {
                role: "assistant";
                name?: string | undefined;
                function_call?: {
                    name: string;
                    arguments: string;
                } | undefined;
                content?: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[] | null | undefined;
                tool_calls?: {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }[] | undefined;
                reasoning?: {
                    id?: string | undefined;
                    content?: string | undefined;
                }[] | undefined;
                reasoning_signature?: string | undefined;
            } | {
                role: "tool";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                tool_call_id: string;
            } | {
                role: "function";
                name: string;
                content: string | null;
            } | {
                role: "developer";
                content: string | {
                    type: "text";
                    text: string;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "model";
                content?: string | null | undefined;
            })[];
            tools?: string | undefined;
        } | {
            type: "completion";
            content: string;
        } | null | undefined;
        preprocessor?: {
            type: "function";
            id: string;
            version?: string | undefined;
        } | {
            type: "global";
            name: string;
            function_type: "preprocessor";
        } | null | undefined;
        origin?: {
            project_id?: string | undefined;
            prompt_id?: string | undefined;
            prompt_version?: string | undefined;
        } | null | undefined;
        parser?: {
            type: "llm_classifier";
            use_cot: boolean;
            choice_scores?: Record<string, number> | undefined;
            choice?: string[] | undefined;
            allow_no_match?: boolean | undefined;
            allow_skip?: boolean | undefined;
        } | null | undefined;
        tool_functions?: ({
            type: "function";
            id: string;
            version?: string | undefined;
        } | {
            type: "global";
            name: string;
            function_type: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox";
        })[] | null | undefined;
        template_format?: "none" | "mustache" | "nunjucks" | null | undefined;
        mcp?: Record<string, {
            type: "id";
            id: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        } | {
            type: "url";
            url: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        }> | null | undefined;
    } | null | undefined;
}, {
    id: string;
    project_id: string;
    name: string;
    slug: string;
    org_id: string;
    _xact_id: string;
    log_id: "p";
    created?: string | null | undefined;
    description?: string | null | undefined;
    metadata?: z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | null | undefined;
    function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | null | undefined;
    tags?: string[] | null | undefined;
    prompt_data?: {
        options?: {
            params?: z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodOptional<z.ZodNumber>;
                max_completion_tokens: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                response_format: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"json_object">;
                }, "strip", z.ZodTypeAny, {
                    type: "json_object";
                }, {
                    type: "json_object";
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"json_schema">;
                    json_schema: z.ZodObject<{
                        name: z.ZodString;
                        description: z.ZodOptional<z.ZodString>;
                        schema: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodString]>>;
                        strict: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }, {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }, {
                    type: "json_schema";
                    json_schema: {
                        name: string;
                        description?: string | undefined;
                        schema?: string | z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | undefined;
                        strict?: boolean | null | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<"text">;
                }, "strip", z.ZodTypeAny, {
                    type: "text";
                }, {
                    type: "text";
                }>, z.ZodNull]>>;
                tool_choice: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodLiteral<"required">, z.ZodObject<{
                    type: z.ZodLiteral<"function">;
                    function: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                    }, {
                        name: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }, {
                    function: {
                        name: string;
                    };
                    type: "function";
                }>]>>;
                function_call: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"auto">, z.ZodLiteral<"none">, z.ZodObject<{
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                }, {
                    name: string;
                }>]>>;
                n: z.ZodOptional<z.ZodNumber>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reasoning_effort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>;
                verbosity: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                max_tokens: z.ZodNumber;
                temperature: z.ZodNumber;
                top_p: z.ZodOptional<z.ZodNumber>;
                top_k: z.ZodOptional<z.ZodNumber>;
                stop_sequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                max_tokens_to_sample: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                maxOutputTokens: z.ZodOptional<z.ZodNumber>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
                temperature: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
                use_cache: z.ZodOptional<z.ZodBoolean>;
                reasoning_enabled: z.ZodOptional<z.ZodBoolean>;
                reasoning_budget: z.ZodOptional<z.ZodNumber>;
            }, z.ZodTypeAny, "passthrough"> | undefined;
            model?: string | undefined;
            position?: string | undefined;
            endpoint_name?: string | null | undefined;
        } | null | undefined;
        prompt?: {
            type: "chat";
            messages: ({
                role: "system";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "user";
                content: string | ({
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "image_url";
                    image_url: {
                        url: string;
                        detail?: "auto" | "low" | "high" | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                } | {
                    type: "file";
                    file: {
                        filename?: string | undefined;
                        file_data?: string | undefined;
                        file_id?: string | undefined;
                    };
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                })[];
                name?: string | undefined;
            } | {
                role: "assistant";
                name?: string | undefined;
                function_call?: {
                    name: string;
                    arguments: string;
                } | undefined;
                content?: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[] | null | undefined;
                tool_calls?: {
                    function: {
                        name: string;
                        arguments: string;
                    };
                    type: "function";
                    id: string;
                }[] | undefined;
                reasoning?: {
                    id?: string | undefined;
                    content?: string | undefined;
                }[] | undefined;
                reasoning_signature?: string | undefined;
            } | {
                role: "tool";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                tool_call_id?: string | undefined;
            } | {
                role: "function";
                name: string;
                content: string | null;
            } | {
                role: "developer";
                content: string | {
                    type: "text";
                    text?: string | undefined;
                    cache_control?: {
                        type: "ephemeral";
                        ttl?: "5m" | "1h" | undefined;
                    } | undefined;
                }[];
                name?: string | undefined;
            } | {
                role: "model";
                content?: string | null | undefined;
            })[];
            tools?: string | undefined;
        } | {
            type: "completion";
            content: string;
        } | null | undefined;
        preprocessor?: {
            type: "function";
            id: string;
            version?: string | undefined;
        } | {
            type: "global";
            name: string;
            function_type?: "preprocessor" | undefined;
        } | null | undefined;
        origin?: {
            project_id?: string | undefined;
            prompt_id?: string | undefined;
            prompt_version?: string | undefined;
        } | null | undefined;
        parser?: {
            type: "llm_classifier";
            use_cot: boolean;
            choice_scores?: Record<string, number> | undefined;
            choice?: string[] | undefined;
            allow_no_match?: boolean | undefined;
            allow_skip?: boolean | undefined;
        } | null | undefined;
        tool_functions?: ({
            type: "function";
            id: string;
            version?: string | undefined;
        } | {
            type: "global";
            name: string;
            function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | undefined;
        })[] | null | undefined;
        template_format?: "none" | "mustache" | "nunjucks" | null | undefined;
        mcp?: Record<string, {
            type: "id";
            id: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        } | {
            type: "url";
            url: string;
            is_disabled?: boolean | undefined;
            enabled_tools?: string[] | null | undefined;
        }> | null | undefined;
    } | null | undefined;
}>;
type PromptType = z.infer<typeof Prompt$1>;
declare const PromptSessionEvent: z.ZodObject<{
    id: z.ZodString;
    _xact_id: z.ZodString;
    created: z.ZodString;
    _pagination_key: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    project_id: z.ZodString;
    prompt_session_id: z.ZodString;
    prompt_session_data: z.ZodOptional<z.ZodUnknown>;
    prompt_data: z.ZodOptional<z.ZodUnknown>;
    function_data: z.ZodOptional<z.ZodUnknown>;
    function_type: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["llm", "scorer", "task", "tool", "custom_view", "preprocessor", "facet", "classifier", "tag", "parameters", "sandbox"]>, z.ZodNull]>>;
    object_data: z.ZodOptional<z.ZodUnknown>;
    completion: z.ZodOptional<z.ZodUnknown>;
    tags: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created: string;
    project_id: string;
    _xact_id: string;
    prompt_session_id: string;
    function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | null | undefined;
    tags?: string[] | null | undefined;
    _pagination_key?: string | null | undefined;
    completion?: unknown;
    prompt_data?: unknown;
    function_data?: unknown;
    prompt_session_data?: unknown;
    object_data?: unknown;
}, {
    id: string;
    created: string;
    project_id: string;
    _xact_id: string;
    prompt_session_id: string;
    function_type?: "llm" | "scorer" | "task" | "tool" | "custom_view" | "preprocessor" | "facet" | "classifier" | "tag" | "parameters" | "sandbox" | null | undefined;
    tags?: string[] | null | undefined;
    _pagination_key?: string | null | undefined;
    completion?: unknown;
    prompt_data?: unknown;
    function_data?: unknown;
    prompt_session_data?: unknown;
    object_data?: unknown;
}>;
type PromptSessionEventType = z.infer<typeof PromptSessionEvent>;

interface GlobalHookAsyncLocalStorage<T> {
    enterWith(store: T): void;
    run<R>(store: T | undefined, callback: () => R): R;
    getStore(): T | undefined;
}
interface GlobalHookHandlers<M = any> {
    start?: (context: M, name: string) => void;
    end?: (context: M, name: string) => void;
    asyncStart?: (context: M, name: string) => void;
    asyncEnd?: (context: M, name: string) => void;
    error?: (context: M, name: string) => void;
}

type IsoAsyncLocalStorage<T> = GlobalHookAsyncLocalStorage<T>;
type IsoChannelHandlers<M = any> = GlobalHookHandlers<M>;

/**
 * Base class for creating instrumentation plugins.
 *
 * Plugins subscribe to global instrumentation hook events and convert them
 * into spans, logs, or other observability data.
 */
declare abstract class BasePlugin {
    protected enabled: boolean;
    protected unsubscribers: Array<() => void>;
    /**
     * Enables the plugin. Must be called before the plugin will receive events.
     */
    enable(): void;
    /**
     * Disables the plugin. After this, the plugin will no longer receive events.
     */
    disable(): void;
    /**
     * Called when the plugin is enabled.
     * Override this to set up subscriptions.
     */
    protected abstract onEnable(): void;
    /**
     * Called when the plugin is disabled.
     * Override this to clean up subscriptions.
     */
    protected abstract onDisable(): void;
    /**
     * Helper to subscribe to a channel with raw handlers.
     *
     * @param channelName - The channel name to subscribe to
     * @param handlers - Event handlers
     */
    protected subscribe(channelName: string, handlers: IsoChannelHandlers): void;
    /**
     * Subscribe to a channel for async methods (non-streaming).
     * Creates a span and logs input/output/metrics.
     */
    protected subscribeToChannel(channelName: string, config: {
        name: string;
        type: string;
        extractInput: (args: any[]) => {
            input: any;
            metadata: any;
        };
        extractOutput: (result: any, endEvent?: any) => any;
        extractMetadata?: (result: any, endEvent?: any) => any;
        extractMetrics: (result: any, startTime?: number, endEvent?: any) => Record<string, number>;
    }): void;
    /**
     * Subscribe to a channel for async methods that may return streams.
     * Handles both streaming and non-streaming responses.
     */
    protected subscribeToStreamingChannel(channelName: string, config: {
        name: string;
        type: string;
        extractInput: (args: any[]) => {
            input: any;
            metadata: any;
        };
        extractOutput: (result: any, endEvent?: any) => any;
        extractMetadata?: (result: any, endEvent?: any) => any;
        extractMetrics: (result: any, startTime?: number, endEvent?: any) => Record<string, number>;
        aggregateChunks?: (chunks: any[], result?: any, endEvent?: any) => {
            output: any;
            metrics: Record<string, number>;
            metadata?: any;
        };
    }): void;
    /**
     * Subscribe to a channel for sync methods that return event-based streams.
     * Used for methods like beta.chat.completions.stream() and responses.stream().
     */
    protected subscribeToSyncStreamChannel(channelName: string, config: {
        name: string;
        type: string;
        extractInput: (args: any[]) => {
            input: any;
            metadata: any;
        };
        extractFromEvent?: (event: any) => {
            output?: any;
            metrics?: Record<string, number>;
            metadata?: any;
        };
    }): void;
}

/**
 * Utilities for instrumentation hook naming and management.
 */
/**
 * Channel naming convention: braintrust:{component}:{operation}
 *
 * Examples:
 * - braintrust:openai:chat.completions.create
 * - braintrust:anthropic:messages.create
 * - braintrust:ai-sdk:generateText
 */
/**
 * Creates a standardized channel name.
 *
 * @param component - The SDK/library being instrumented (e.g., 'openai', 'anthropic')
 * @param operation - The operation being traced (e.g., 'chat.completions.create')
 * @returns The full channel name
 */
declare function createChannelName(component: string, operation: string): string;
/**
 * Parses a channel name into its component parts.
 *
 * @param channelName - The full channel name
 * @returns Object with component and operation, or null if invalid
 */
declare function parseChannelName(channelName: string): {
    component: string;
    operation: string;
} | null;
/**
 * Validates a channel name follows the expected convention.
 *
 * @param channelName - The channel name to validate
 * @returns True if valid
 */
declare function isValidChannelName(channelName: string): boolean;

/**
 * Base context object shared across all events in a trace.
 */
interface BaseContext {
    /**
     * Unique identifier for this trace.
     * Can be used to correlate start/end/error events.
     */
    traceId?: string;
    /**
     * Arbitrary data that can be attached by event handlers
     * and passed between start/end/error events.
     */
    [key: string]: unknown;
}
/**
 * Event emitted before the synchronous portion of a function executes.
 * This is where you should create spans and extract input data.
 */
interface StartEvent<TInput = unknown> extends BaseContext {
    /**
     * Arguments passed to the function being traced.
     */
    arguments: TInput[];
}
/**
 * Event emitted after the synchronous portion completes.
 * For async functions, this fires when the promise is returned (not settled).
 */
interface EndEvent<TResult = unknown> extends BaseContext {
    /**
     * The result of the synchronous portion.
     * For async functions, this is the promise (not the resolved value).
     */
    result: TResult;
    /**
     * Arguments passed to the function (also available in StartEvent).
     */
    arguments?: unknown[];
}
/**
 * Event emitted when a function throws or a promise rejects.
 */
interface ErrorEvent extends BaseContext {
    /**
     * The error that was thrown or the rejection reason.
     */
    error: Error;
    /**
     * Arguments passed to the function (also available in StartEvent).
     */
    arguments?: unknown[];
}
interface AsyncStartEvent<TInput = unknown> extends StartEvent<TInput> {
}
/**
 * Event emitted when a promise finishes settling.
 * This fires BEFORE control returns to user code after await.
 * This is where you should extract output data and finalize spans.
 */
interface AsyncEndEvent<TResult = unknown> extends EndEvent<TResult> {
}
/**
 * Subscription handlers for a tracing-compatible global hook.
 *
 * Common usage pattern:
 * - Use start to create spans and extract input
 * - Use asyncEnd to extract output and finalize spans
 * - Use error to handle failures
 */
interface ChannelHandlers<TInput = unknown, TResult = unknown> {
    /**
     * Called before the synchronous portion of a function executes.
     * Use this to create spans and extract input data.
     */
    start?: (event: StartEvent<TInput>) => void;
    /**
     * Called after the synchronous portion completes (promise returned).
     * Usually not needed for typical instrumentation.
     */
    end?: (event: EndEvent<TResult>) => void;
    /**
     * Called when a promise begins to settle.
     * Usually not needed for typical instrumentation.
     */
    asyncStart?: (event: AsyncStartEvent<TInput>) => void;
    /**
     * Called when a promise finishes settling, before user code continues.
     * Use this to extract output, patch streams, and finalize spans.
     */
    asyncEnd?: (event: AsyncEndEvent<TResult>) => void;
    /**
     * Called when a function throws or promise rejects.
     * Use this to log errors and clean up spans.
     */
    error?: (event: ErrorEvent) => void;
}

interface InstrumentationIntegrationsConfig {
    openai?: boolean;
    anthropic?: boolean;
    vercel?: boolean;
    aisdk?: boolean;
    google?: boolean;
    googleGenAI?: boolean;
    googleADK?: boolean;
    huggingface?: boolean;
    claudeAgentSDK?: boolean;
    cloudflareAIChat?: boolean;
    cloudflareThink?: boolean;
    cursor?: boolean;
    cursorSDK?: boolean;
    flue?: boolean;
    mastra?: boolean;
    openAIAgents?: boolean;
    openrouter?: boolean;
    openrouterAgent?: boolean;
    mistral?: boolean;
    ollama?: boolean;
    cohere?: boolean;
    groq?: boolean;
    bedrock?: boolean;
    awsBedrock?: boolean;
    awsBedrockRuntime?: boolean;
    genkit?: boolean;
    gitHubCopilot?: boolean;
    openaiCodexSDK?: boolean;
    piCodingAgent?: boolean;
    strandsAgentSDK?: boolean;
    cloudflareAgents?: boolean;
    langchain?: boolean;
    langgraph?: boolean;
    langsmith?: boolean;
}
interface InstrumentationConfig {
    /**
     * Configuration for individual SDK integrations.
     * Set to false to disable instrumentation for that SDK.
     */
    integrations?: InstrumentationIntegrationsConfig;
}

interface BraintrustPluginConfig {
    integrations?: InstrumentationIntegrationsConfig;
}
/**
 * Default Braintrust plugin that manages all AI provider instrumentation plugins.
 *
 * This plugin orchestrates:
 * - OpenAI SDK (chat completions, embeddings, etc.)
 * - Anthropic SDK (messages)
 * - Claude Agent SDK (agent interactions)
 * - Vercel AI SDK (generateText, streamText, etc.)
 * - Google GenAI SDK
 * - HuggingFace Inference SDK
 * - LangChain.js and LangGraph
 * - Mistral SDK
 * - Ollama SDK
 * - Cohere SDK
 *
 * The plugin is automatically enabled when the Braintrust library is loaded.
 * Individual integrations can be disabled via configuration.
 */
declare class BraintrustPlugin extends BasePlugin {
    private config;
    private openaiPlugin;
    private openAICodexPlugin;
    private anthropicPlugin;
    private aiSDKPlugin;
    private claudeAgentSDKPlugin;
    private cloudflareThinkPlugin;
    private cursorSDKPlugin;
    private openAIAgentsPlugin;
    private googleGenAIPlugin;
    private huggingFacePlugin;
    private huggingFaceTransformersPlugin;
    private openRouterPlugin;
    private openRouterAgentPlugin;
    private mistralPlugin;
    private ollamaPlugin;
    private googleADKPlugin;
    private coherePlugin;
    private groqPlugin;
    private bedrockRuntimePlugin;
    private genkitPlugin;
    private gitHubCopilotPlugin;
    private fluePlugin;
    private langChainPlugin;
    private langSmithPlugin;
    private piCodingAgentPlugin;
    private strandsAgentSDKPlugin;
    private cloudflareAIChatPlugin;
    private cloudflareAgentsPlugin;
    constructor(config?: BraintrustPluginConfig);
    protected onEnable(): void;
    protected onDisable(): void;
}

type DebugLogLevel = "error" | "warn" | "info" | "debug";
type DebugLogLevelOption = DebugLogLevel | false | undefined;

/**
 * Abstract base class for ID generators
 */
declare abstract class IDGenerator {
    /**
     * Generate a span ID
     */
    abstract getSpanId(): string;
    /**
     * Generate a trace ID
     */
    abstract getTraceId(): string;
    /**
     * Return true if the generator should use span_id as root_span_id for backwards compatibility
     */
    abstract shareRootSpanId(): boolean;
}

type TraceContextHeaderValue = string | number | readonly string[] | null | undefined;
/**
 * Minimal structural interface for outbound HTTP header carriers.
 *
 * Supports plain objects, Web/Fetch-compatible `Headers`, Node/Fastify-style
 * response carriers, and mutable `HeadersInit` tuple arrays.
 */
type TraceContextCarrier = {
    [name: string]: TraceContextHeaderValue;
} | {
    get(name: string): TraceContextHeaderValue;
    set(name: string, value: string): void;
    delete?(name: string): void;
} | {
    getHeader(name: string): TraceContextHeaderValue;
    setHeader(name: string, value: string): void;
    removeHeader?(name: string): void;
} | {
    get?(name: string): TraceContextHeaderValue;
    getHeader?(name: string): TraceContextHeaderValue;
    header(name: string, value: string): void;
    delete?(name: string): void;
    removeHeader?(name: string): void;
} | [string, string][];

declare const TRANSACTION_ID_FIELD = "_xact_id";
declare const IS_MERGE_FIELD = "_is_merge";
declare const MERGE_PATHS_FIELD = "_merge_paths";
declare const AUDIT_SOURCE_FIELD = "_audit_source";
declare const AUDIT_METADATA_FIELD = "_audit_metadata";
declare const VALID_SOURCES: readonly ["app", "api", "external"];
type Source = (typeof VALID_SOURCES)[number];
declare const ASYNC_SCORING_CONTROL_FIELD = "_async_scoring_control";
declare const SKIP_ASYNC_SCORING_FIELD = "_skip_async_scoring";
type TransactionId = string;

declare const AsyncScoringControl: z.ZodUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"score_update">;
    token: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    kind: "score_update";
    token?: string | undefined;
}, {
    kind: "score_update";
    token?: string | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"state_override">;
    state: z.ZodUnion<[z.ZodObject<{
        status: z.ZodLiteral<"enabled">;
        token: z.ZodString;
        function_ids: z.ZodArray<z.ZodUnknown, "many">;
        skip_logging: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        status: "enabled";
        token: string;
        function_ids: unknown[];
        skip_logging?: boolean | null | undefined;
    }, {
        status: "enabled";
        token: string;
        function_ids: unknown[];
        skip_logging?: boolean | null | undefined;
    }>, z.ZodObject<{
        status: z.ZodLiteral<"disabled">;
    }, "strip", z.ZodTypeAny, {
        status: "disabled";
    }, {
        status: "disabled";
    }>, z.ZodNull, z.ZodNull]>;
}, "strip", z.ZodTypeAny, {
    kind: "state_override";
    state: {
        status: "enabled";
        token: string;
        function_ids: unknown[];
        skip_logging?: boolean | null | undefined;
    } | {
        status: "disabled";
    } | null;
}, {
    kind: "state_override";
    state: {
        status: "enabled";
        token: string;
        function_ids: unknown[];
        skip_logging?: boolean | null | undefined;
    } | {
        status: "disabled";
    } | null;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"state_force_reselect">;
}, "strip", z.ZodTypeAny, {
    kind: "state_force_reselect";
}, {
    kind: "state_force_reselect";
}>, z.ZodObject<{
    kind: z.ZodLiteral<"state_enabled_force_rescore">;
}, "strip", z.ZodTypeAny, {
    kind: "state_enabled_force_rescore";
}, {
    kind: "state_enabled_force_rescore";
}>, z.ZodObject<{
    kind: z.ZodLiteral<"add_triggered_functions">;
    triggered_function_ids: z.ZodArray<z.ZodUnknown, "many">;
}, "strip", z.ZodTypeAny, {
    kind: "add_triggered_functions";
    triggered_function_ids: unknown[];
}, {
    kind: "add_triggered_functions";
    triggered_function_ids: unknown[];
}>, z.ZodObject<{
    kind: z.ZodLiteral<"complete_triggered_functions">;
    function_ids: z.ZodArray<z.ZodUnknown, "many">;
    triggered_xact_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    kind: "complete_triggered_functions";
    triggered_xact_id: string;
    function_ids: unknown[];
}, {
    kind: "complete_triggered_functions";
    triggered_xact_id: string;
    function_ids: unknown[];
}>]>;
type AsyncScoringControlType = z.infer<typeof AsyncScoringControl>;
declare const ObjectReference: z.ZodObject<{
    object_type: z.ZodEnum<["project_logs", "experiment", "dataset", "prompt", "function", "prompt_session"]>;
    object_id: z.ZodString;
    id: z.ZodString;
    _xact_id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    created: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    object_type: "function" | "experiment" | "dataset" | "prompt" | "prompt_session" | "project_logs";
    object_id: string;
    created?: string | null | undefined;
    _xact_id?: string | null | undefined;
}, {
    id: string;
    object_type: "function" | "experiment" | "dataset" | "prompt" | "prompt_session" | "project_logs";
    object_id: string;
    created?: string | null | undefined;
    _xact_id?: string | null | undefined;
}>;
type ObjectReferenceType = z.infer<typeof ObjectReference>;

type IdField = {
    id: string;
};
type InputField = {
    input: unknown;
};
type OtherExperimentLogFields = {
    output: unknown;
    expected: unknown;
    error: unknown;
    tags: string[];
    scores: Record<string, number | null>;
    classifications?: Record<string, {
        id: string;
        label?: string;
    }[]>;
    metadata: Record<string, unknown>;
    metrics: Record<string, unknown>;
    datasetRecordId: string;
    origin: ObjectReferenceType;
    span_attributes: Record<string, unknown>;
    [ASYNC_SCORING_CONTROL_FIELD]: AsyncScoringControlType;
    [MERGE_PATHS_FIELD]: string[][];
    [SKIP_ASYNC_SCORING_FIELD]: boolean;
};
type ExperimentLogPartialArgs = Partial<OtherExperimentLogFields> & Partial<InputField>;
type ExperimentLogFullArgs = Partial<Omit<OtherExperimentLogFields, "output" | "scores">> & Required<Pick<OtherExperimentLogFields, "output" | "scores">> & Partial<InputField> & Partial<IdField>;
type LogFeedbackFullArgs = IdField & Partial<Omit<OtherExperimentLogFields, "output" | "metrics" | "datasetRecordId"> & {
    comment: string;
    source: Source;
}>;
interface ParentExperimentIds {
    experiment_id: string;
}
interface ParentProjectLogIds {
    project_id: string;
    log_id: "g";
}
interface ParentPlaygroundLogIds {
    prompt_session_id: string;
    log_id: "x";
}
type ExperimentEvent = Partial<InputField> & Partial<OtherExperimentLogFields> & {
    id: string;
    span_id?: string;
    root_span_id?: string;
    experiment_id: string;
    [IS_MERGE_FIELD]: boolean;
} & Partial<{
    created: string;
    span_parents: string[];
    span_attributes: Record<string, unknown>;
    context: Record<string, unknown>;
    is_root: boolean | null;
    [AUDIT_SOURCE_FIELD]: Source;
    [AUDIT_METADATA_FIELD]?: Record<string, unknown>;
}>;
type DatasetEvent = {
    input?: unknown;
    tags?: string[];
    metadata?: unknown;
    created?: string;
    origin?: ObjectReferenceType;
    id: string;
    dataset_id: string;
} & ({
    expected?: unknown;
} | {
    output?: unknown;
});
type LoggingEvent = Omit<ExperimentEvent, "experiment_id"> & {
    project_id: string;
    log_id: "g";
};
type PlaygroundLogEvent = Omit<ExperimentEvent, "experiment_id"> & {
    prompt_session_id: string;
    log_id: "x";
};
type CommentEvent = IdField & {
    created: string;
    origin: {
        id: string;
    };
    comment: {
        text: string;
    };
    [AUDIT_SOURCE_FIELD]: Source;
    [AUDIT_METADATA_FIELD]?: Record<string, unknown>;
} & (ParentExperimentIds | ParentProjectLogIds | ParentPlaygroundLogIds);
type BackgroundLogEvent = ExperimentEvent | DatasetEvent | LoggingEvent | PlaygroundLogEvent | CommentEvent;
declare const DEFAULT_IS_LEGACY_DATASET = false;
interface LegacyDatasetRecord {
    id: string;
    input: any;
    output: any;
    metadata: any;
}
interface NewDatasetRecord {
    id: string;
    input: any;
    expected: any;
    tags: any;
    metadata: any;
}
type DatasetRecord<IsLegacyDataset extends boolean = typeof DEFAULT_IS_LEGACY_DATASET> = IsLegacyDataset extends true ? LegacyDatasetRecord : NewDatasetRecord;

declare enum SpanObjectTypeV3 {
    EXPERIMENT = 1,
    PROJECT_LOGS = 2,
    PLAYGROUND_LOGS = 3
}
declare const spanComponentsV3Schema: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    object_type: z.ZodNativeEnum<typeof SpanObjectTypeV3>;
    propagated_event: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    object_type: SpanObjectTypeV3;
    propagated_event?: Record<string, unknown> | null | undefined;
}, {
    object_type: SpanObjectTypeV3;
    propagated_event?: Record<string, unknown> | null | undefined;
}>, z.ZodUnion<[z.ZodObject<{
    object_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    compute_object_metadata_args: z.ZodOptional<z.ZodNull>;
}, "strip", z.ZodTypeAny, {
    object_id?: string | null | undefined;
    compute_object_metadata_args?: null | undefined;
}, {
    object_id?: string | null | undefined;
    compute_object_metadata_args?: null | undefined;
}>, z.ZodObject<{
    object_id: z.ZodOptional<z.ZodNull>;
    compute_object_metadata_args: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    compute_object_metadata_args: Record<string, unknown>;
    object_id?: null | undefined;
}, {
    compute_object_metadata_args: Record<string, unknown>;
    object_id?: null | undefined;
}>]>>, z.ZodUnion<[z.ZodObject<{
    row_id: z.ZodString;
    span_id: z.ZodString;
    root_span_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    span_id: string;
    root_span_id: string;
    row_id: string;
}, {
    span_id: string;
    root_span_id: string;
    row_id: string;
}>, z.ZodObject<{
    row_id: z.ZodOptional<z.ZodNull>;
    span_id: z.ZodOptional<z.ZodNull>;
    root_span_id: z.ZodOptional<z.ZodNull>;
}, "strip", z.ZodTypeAny, {
    span_id?: null | undefined;
    root_span_id?: null | undefined;
    row_id?: null | undefined;
}, {
    span_id?: null | undefined;
    root_span_id?: null | undefined;
    row_id?: null | undefined;
}>]>>;
type SpanComponentsV3Data = z.infer<typeof spanComponentsV3Schema>;
declare class SpanComponentsV3 {
    data: SpanComponentsV3Data;
    constructor(data: SpanComponentsV3Data);
    toStr(): string;
    static fromStr(s: string): SpanComponentsV3;
    objectIdFields(): ParentExperimentIds | ParentProjectLogIds | ParentPlaygroundLogIds;
    export(): Promise<string>;
    private static fromJsonObj;
}

declare const spanComponentsV4Schema: z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    object_type: z.ZodNativeEnum<typeof SpanObjectTypeV3>;
    propagated_event: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    object_type: SpanObjectTypeV3;
    propagated_event?: Record<string, unknown> | null | undefined;
}, {
    object_type: SpanObjectTypeV3;
    propagated_event?: Record<string, unknown> | null | undefined;
}>, z.ZodUnion<[z.ZodObject<{
    object_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    compute_object_metadata_args: z.ZodOptional<z.ZodNull>;
}, "strip", z.ZodTypeAny, {
    object_id?: string | null | undefined;
    compute_object_metadata_args?: null | undefined;
}, {
    object_id?: string | null | undefined;
    compute_object_metadata_args?: null | undefined;
}>, z.ZodObject<{
    object_id: z.ZodOptional<z.ZodNull>;
    compute_object_metadata_args: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    compute_object_metadata_args: Record<string, unknown>;
    object_id?: null | undefined;
}, {
    compute_object_metadata_args: Record<string, unknown>;
    object_id?: null | undefined;
}>]>>, z.ZodUnion<[z.ZodObject<{
    row_id: z.ZodString;
    span_id: z.ZodString;
    root_span_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    span_id: string;
    root_span_id: string;
    row_id: string;
}, {
    span_id: string;
    root_span_id: string;
    row_id: string;
}>, z.ZodObject<{
    row_id: z.ZodOptional<z.ZodNull>;
    span_id: z.ZodOptional<z.ZodNull>;
    root_span_id: z.ZodOptional<z.ZodNull>;
}, "strip", z.ZodTypeAny, {
    span_id?: null | undefined;
    root_span_id?: null | undefined;
    row_id?: null | undefined;
}, {
    span_id?: null | undefined;
    root_span_id?: null | undefined;
    row_id?: null | undefined;
}>]>>;
type SpanComponentsV4Data = z.infer<typeof spanComponentsV4Schema>;
declare class SpanComponentsV4 {
    data: SpanComponentsV4Data;
    constructor(data: SpanComponentsV4Data);
    toStr(): string;
    static fromStr(s: string): SpanComponentsV4;
    objectIdFields(): ParentExperimentIds | ParentProjectLogIds | ParentPlaygroundLogIds;
    export(): Promise<string>;
    private static fromJsonObj;
}

declare const spanTypeAttributeValues: readonly ["llm", "score", "function", "eval", "task", "tool", "automation", "facet", "preprocessor", "classifier", "review"];
type SpanType = (typeof spanTypeAttributeValues)[number];

declare class LazyValue<T> {
    private callable;
    private resolvedValue;
    private value;
    constructor(callable: () => Promise<T>);
    get(): Promise<T>;
    getSync(): {
        resolved: boolean;
        value: T | undefined;
    };
    get hasSucceeded(): boolean;
}

type TemplateFormat = "mustache" | "nunjucks" | "none";

/**
 * Options for configuring an LRUCache instance.
 */
interface LRUCacheOptions {
    /**
     * Maximum number of items to store in the cache.
     * If not specified, the cache will grow unbounded.
     */
    max?: number;
}
/**
 * A Least Recently Used (LRU) cache implementation.
 *
 * This cache maintains items in order of use, evicting the least recently used item
 * when the cache reaches its maximum size (if specified). Items are considered "used"
 * when they are either added to the cache or retrieved from it.
 *
 * If no maximum size is specified, the cache will grow unbounded.
 *
 * @template K - The type of keys stored in the cache.
 * @template V - The type of values stored in the cache.
 */
declare class LRUCache<K, V> {
    private cache;
    private readonly maxSize?;
    constructor(options?: LRUCacheOptions);
    /**
     * Retrieves a value from the cache.
     * If the key exists, the item is marked as most recently used.
     *
     * @param key - The key to look up.
     * @returns The cached value if found, undefined otherwise.
     */
    get(key: K): V | undefined;
    /**
     * Checks whether a key exists and marks it as most recently used.
     */
    has(key: K): boolean;
    /**
     * Stores a value in the cache.
     * If the key already exists, the value is updated and marked as most recently used.
     * If the cache is at its maximum size, the least recently used item is evicted.
     *
     * @param key - The key to store.
     * @param value - The value to store.
     */
    set(key: K, value: V): void;
    /**
     * Removes an item from the cache.
     */
    delete(key: K): boolean;
    /**
     * Iterates over cache entries from least to most recently used.
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * Iterates over cache keys from least to most recently used.
     */
    keys(): IterableIterator<K>;
    /**
     * Iterates over cache values from least to most recently used.
     */
    values(): IterableIterator<V>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    /**
     * Removes all items from the cache.
     */
    clear(): void;
}

/**
 * Configuration options for DiskCache.
 */
interface DiskCacheOptions {
    /**
     * Directory where cache files will be stored.
     */
    cacheDir: string;
    /**
     * Maximum number of entries to store in the cache.
     * If not specified, the cache will grow unbounded.
     */
    max?: number;
    logWarnings?: boolean;
    /**
     * Whether to create the cache directory if it doesn't exist.
     */
    mkdir?: boolean;
}
/**
 * A persistent filesystem-based cache implementation.
 *
 * This cache stores entries as compressed files on disk and implements an LRU eviction
 * policy based on file modification times (mtime). While access times (atime) would be more
 * semantically accurate for LRU, we use mtime because:
 *
 * 1. Many modern filesystems mount with noatime for performance reasons.
 * 2. Even when atime updates are enabled, they may be subject to update delays.
 * 3. mtime updates are more reliably supported across different filesystems.
 *
 * @template T - The type of values stored in the cache.
 */
declare class DiskCache<T> {
    private readonly dir;
    private readonly max?;
    private readonly mkdir;
    private readonly logWarnings;
    /**
     * Creates a new DiskCache instance.
     * @param options - Configuration options for the cache.
     */
    constructor(options: DiskCacheOptions);
    getEntryPath(key: string): string;
    /**
     * Retrieves a value from the cache.
     * Updates the entry's access time when read.
     *
     * @param key - The key to look up in the cache.
     * @returns The cached value if found, undefined otherwise.
     */
    get(key: string): Promise<T | undefined>;
    /**
     * Stores a value in the cache.
     * If the cache is at its maximum size, the least recently used entries will be evicted.
     *
     * @param key - The key to store the value under.
     * @param value - The value to store in the cache.
     */
    set(key: string, value: T): Promise<void>;
    private evictOldestIfFull;
}

/**
 * Identifies a prompt in the cache using either project ID or project name along with the slug.
 */
interface PromptKey {
    /**
     * The slug identifier for the prompt within its project.
     */
    slug?: string;
    /**
     * The version of the prompt.
     */
    version?: string;
    /**
     * The ID of the project containing the prompt.
     * Either projectId or projectName must be provided.
     */
    projectId?: string;
    /**
     * The name of the project containing the prompt.
     * Either projectId or projectName must be provided.
     */
    projectName?: string;
    /**
     * The ID of a specific prompt. If provided, slug and project parameters are ignored.
     */
    id?: string;
}
/**
 * A configurable cache for Braintrust prompts with optional in-memory and filesystem storage.
 *
 * This cache can use either layer independently, both layers together, or no layers.
 */
declare class PromptCache {
    private readonly memoryCache?;
    private readonly diskCache?;
    constructor(options: {
        memoryCache?: LRUCache<string, Prompt>;
        diskCache?: DiskCache<Prompt>;
    });
    /**
     * Retrieves a prompt from the cache.
     * First checks the in-memory LRU cache, then falls back to checking the disk cache if available.
     */
    get(key: PromptKey): Promise<Prompt | undefined>;
    /**
     * Stores a prompt in the cache.
     * Writes to the in-memory cache and the disk cache if available.
     *
     * @param key - The key to store the value under.
     * @param value - The value to store in the cache.
     * @throws If there is an error writing to the disk cache.
     */
    set(key: PromptKey, value: Prompt): Promise<void>;
}

interface ParametersKey {
    slug?: string;
    version?: string;
    projectId?: string;
    projectName?: string;
    id?: string;
}
declare class ParametersCache {
    private readonly memoryCache?;
    private readonly diskCache?;
    constructor(options: {
        memoryCache?: LRUCache<string, RemoteEvalParameters>;
        diskCache?: DiskCache<RemoteEvalParameters>;
    });
    get(key: ParametersKey): Promise<RemoteEvalParameters | undefined>;
    set(key: ParametersKey, value: RemoteEvalParameters): Promise<void>;
}

/**
 * SpanCache provides a disk-based cache for span data, allowing
 * scorers to read spans without making server round-trips when possible.
 *
 * Spans are stored on disk to minimize memory usage during evaluations.
 * The cache file is automatically cleaned up when dispose() is called.
 *
 * In browser environments where filesystem access isn't available,
 * the cache becomes a no-op (all lookups return undefined).
 */
interface CachedSpan {
    input?: unknown;
    output?: unknown;
    expected?: unknown;
    error?: unknown;
    scores?: Record<string, unknown>;
    metrics?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    tags?: string[];
    span_id: string;
    span_parents?: string[];
    is_root?: boolean | null;
    span_attributes?: {
        name?: string;
        type?: string;
        [key: string]: unknown;
    };
}
/**
 * Disk-based cache for span data, keyed by rootSpanId.
 *
 * This cache writes spans to a temporary file to minimize memory usage.
 * It uses append-only writes and reads the full file when querying.
 *
 * In browser environments, this cache is automatically disabled and
 * all operations become no-ops.
 */
declare class SpanCache {
    private cacheFilePath;
    private fileHandle;
    private initialized;
    private initPromise;
    private _explicitlyDisabled;
    private _enabled;
    private _activeEvalCount;
    private rootSpanIndex;
    constructor(options?: {
        disabled?: boolean;
    });
    /**
     * Disable the cache at runtime. This is called automatically when
     * initFunction is used, since remote function spans won't be in the cache.
     */
    disable(): void;
    /**
     * Start caching spans for use during evaluations.
     * This only starts caching if the cache wasn't permanently disabled.
     * Called by Eval() to turn on caching for the duration of the eval.
     * Uses reference counting to support parallel evals.
     */
    start(): void;
    /**
     * Stop caching spans and return to the default disabled state.
     * Unlike disable(), this allows start() to work again for future evals.
     * Called after an eval completes to return to the default state.
     * Uses reference counting - only disables when all evals are complete.
     */
    stop(): void;
    get disabled(): boolean;
    private ensureInitialized;
    /**
     * Register a handler to clean up the temp file on process exit.
     * Uses a global registry to avoid registering multiple handlers.
     */
    private registerExitHandler;
    private writeBuffer;
    private flushScheduled;
    private flushPromise;
    /**
     * Queue a span write for async flushing.
     * This is non-blocking - writes are buffered in memory and flushed
     * to disk on the next microtask.
     */
    queueWrite(rootSpanId: string, spanId: string, data: CachedSpan): void;
    /**
     * Flush the write buffer to disk asynchronously.
     * Called automatically after queueWrite, but can also be called explicitly.
     */
    flushWriteBuffer(): Promise<void>;
    /**
     * Wait for any pending writes to complete.
     * Call this before reading from the cache to ensure consistency.
     */
    waitForPendingWrites(): Promise<void>;
    /**
     * Get all cached spans for a given rootSpanId.
     *
     * This reads the file and merges all records for the given rootSpanId.
     *
     * @param rootSpanId The root span ID to look up
     * @returns Array of cached spans, or undefined if not in cache
     */
    getByRootSpanId(rootSpanId: string): CachedSpan[] | undefined;
    /**
     * Check if a rootSpanId has cached data.
     */
    has(rootSpanId: string): boolean;
    /**
     * Clear all cached spans for a given rootSpanId.
     * Note: This only removes from the index. The data remains in the file
     * but will be ignored on reads.
     */
    clear(rootSpanId: string): void;
    /**
     * Clear all cached data and remove the cache file.
     */
    clearAll(): void;
    /**
     * Get the number of root spans currently tracked.
     */
    get size(): number;
    /**
     * Clean up the cache file. Call this when the eval is complete.
     * Only performs cleanup when all active evals have completed (refcount = 0).
     */
    dispose(): void;
}

type SpanOriginEnvironment = {
    type?: string;
    name?: string;
};

/// <reference lib="dom" />

declare const RESET_CONTEXT_MANAGER_STATE: unique symbol;
declare const datasetRestorePreviewResultSchema: z.ZodObject<{
    rows_to_restore: z.ZodNumber;
    rows_to_delete: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    rows_to_restore: number;
    rows_to_delete: number;
}, {
    rows_to_restore: number;
    rows_to_delete: number;
}>;
type DatasetRestorePreviewResult = z.infer<typeof datasetRestorePreviewResultSchema>;
declare const datasetRestoreResultSchema: z.ZodObject<{
    xact_id: z.ZodNullable<z.ZodString>;
    rows_restored: z.ZodNumber;
    rows_deleted: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    xact_id: string | null;
    rows_restored: number;
    rows_deleted: number;
}, {
    xact_id: string | null;
    rows_restored: number;
    rows_deleted: number;
}>;
type DatasetRestoreResult = z.infer<typeof datasetRestoreResultSchema>;
declare const parametersRowSchema: z.ZodObject<{
    id: z.ZodString;
    _xact_id: z.ZodString;
    project_id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    function_type: z.ZodLiteral<"parameters">;
    function_data: z.ZodObject<{
        type: z.ZodLiteral<"parameters">;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        __schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        type: "parameters";
        __schema: Record<string, unknown>;
        data?: Record<string, unknown> | undefined;
    }, {
        type: "parameters";
        __schema: Record<string, unknown>;
        data?: Record<string, unknown> | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodUnion<[z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    project_id: string;
    name: string;
    slug: string;
    function_type: "parameters";
    _xact_id: string;
    function_data: {
        type: "parameters";
        __schema: Record<string, unknown>;
        data?: Record<string, unknown> | undefined;
    };
    description?: string | null | undefined;
    metadata?: z.objectOutputType<{}, z.ZodTypeAny, "passthrough"> | null | undefined;
}, {
    id: string;
    project_id: string;
    name: string;
    slug: string;
    function_type: "parameters";
    _xact_id: string;
    function_data: {
        type: "parameters";
        __schema: Record<string, unknown>;
        data?: Record<string, unknown> | undefined;
    };
    description?: string | null | undefined;
    metadata?: z.objectInputType<{}, z.ZodTypeAny, "passthrough"> | null | undefined;
}>;
type ParametersRow = z.infer<typeof parametersRowSchema>;

interface ContextParentSpanIds {
    rootSpanId: string;
    spanParents: string[];
}
type SetCurrentArg = {
    setCurrent?: boolean;
};
type StartSpanEventArgs = ExperimentLogPartialArgs & Partial<IdField>;
type StartSpanArgs = {
    name?: string;
    type?: SpanType;
    spanAttributes?: Record<any, any>;
    startTime?: number;
    /**
     * The parent to start this span under. May be an exported span slug string
     * (from `span.export()`) or an opaque W3C trace-context (from
     * {@link extractTraceContextFromHeaders}).
     */
    parent?: string | PropagationContext;
    event?: StartSpanEventArgs;
    propagatedEvent?: StartSpanEventArgs;
    spanId?: string;
    parentSpanIds?: ParentSpanIds | MultiParentSpanIds;
};
type EndSpanArgs = {
    endTime?: number;
};
interface Exportable {
    /**
     * Return a serialized representation of the object that can be used to start subspans in other places. See {@link Span.traced} for more details.
     */
    export(): Promise<string>;
}
/**
 * A Span encapsulates logged data and metrics for a unit of work. This interface is shared by all span implementations.
 *
 * We suggest using one of the various `traced` methods, instead of creating Spans directly. See {@link Span.traced} for full details.
 */
interface Span extends Exportable {
    /**
     * Row ID of the span.
     */
    id: string;
    /**
     * Span ID of the span.
     */
    spanId: string;
    /**
     * Root span ID of the span.
     */
    rootSpanId: string;
    /**
     * Parent span IDs of the span.
     */
    spanParents: string[];
    getParentInfo(): {
        objectType: SpanObjectTypeV3;
        objectId: LazyValue<string>;
        computeObjectMetadataArgs: Record<string, unknown> | undefined;
    } | undefined;
    /**
     * Incrementally update the current span with new data. The event will be batched and uploaded behind the scenes.
     *
     * @param event: Data to be logged. See {@link Experiment.log} for full details.
     */
    log(event: ExperimentLogPartialArgs): void;
    /**
     * Add feedback to the current span. Unlike `Experiment.logFeedback` and `Logger.logFeedback`, this method does not accept an id parameter, because it logs feedback to the current span.
     *
     * @param event: Data to be logged. See {@link Experiment.logFeedback} for full details.
     */
    logFeedback(event: Omit<LogFeedbackFullArgs, "id">): void;
    /**
     * Create a new span and run the provided callback. This is useful if you want to log more detailed trace information beyond the scope of a single log event. Data logged over several calls to `Span.log` will be merged into one logical row.
     *
     * Spans created within `traced` are ended automatically. By default, the span is marked as current, so they can be accessed using `braintrust.currentSpan`.
     *
     * @param callback The function to be run under the span context.
     * @param args.name Optional name of the span. If not provided, a name will be inferred from the call stack.
     * @param args.type Optional type of the span. If not provided, the type will be unset.
     * @param args.span_attributes Optional additional attributes to attach to the span, such as a type name.
     * @param args.start_time Optional start time of the span, as a timestamp in seconds.
     * @param args.setCurrent If true (the default), the span will be marked as the currently-active span for the duration of the callback.
     * @param args.parent Optional parent info string for the span. The string can be generated from `[Span,Experiment,Logger].export`. If not provided, the current span will be used (depending on context). This is useful for adding spans to an existing trace.
     * @param args.event Data to be logged. See {@link Experiment.log} for full details.
     * @returns The result of running `callback`.
     */
    traced<R>(callback: (span: Span) => R, args?: StartSpanArgs & SetCurrentArg): R;
    /**
     * Lower-level alternative to `traced`. This allows you to start a span yourself, and can be useful in situations
     * where you cannot use callbacks. However, spans started with `startSpan` will not be marked as the "current span",
     * so `currentSpan()` and `traced()` will be no-ops. If you want to mark a span as current, use `traced` instead.
     *
     * See {@link Span.traced} for full details.
     *
     * @returns The newly-created `Span`
     */
    startSpan(args?: StartSpanArgs): Span;
    /**
     * Log an end time to the span (defaults to the current time). Returns the logged time.
     *
     * Will be invoked automatically if the span is constructed with `traced`.
     *
     * @param args.endTime Optional end time of the span, as a timestamp in seconds.
     * @returns The end time logged to the span metrics.
     */
    end(args?: EndSpanArgs): number;
    /**
     * Serialize the identifiers of this span. The return value can be used to
     * identify this span when starting a subspan elsewhere, such as another
     * process or service, without needing to access this `Span` object. See the
     * parameters of {@link Span.startSpan} for usage details.
     *
     * Callers should treat the return value as opaque. The serialization format
     * may change from time to time. If parsing is needed, use
     * `SpanComponentsV3.fromStr`.
     *
     * @returns Serialized representation of this span's identifiers.
     */
    export(): Promise<string>;
    /**
     * Inject W3C trace-context headers (`traceparent` and `baggage`) for this span
     * into a carrier, for distributed tracing across service boundaries.
     *
     * Adds `traceparent` (trace identity) and, when this span's Braintrust parent
     * is known, a `baggage` entry `braintrust.parent=<parent>` (merged with any
     * pre-existing baggage). Propagation is best-effort and never throws; if the
     * span's ids are not W3C-shaped hex (e.g. legacy UUID mode), `traceparent` is
     * omitted.
     *
     * @param carrier Optional existing carrier (e.g. outbound HTTP headers) to
     *   mutate and return. Supports plain objects, Web `Headers`, Node-style
     *   `setHeader` carriers, framework `header` carriers, and mutable
     *   `HeadersInit` tuple arrays. A new object is created if not provided.
     * @returns The carrier with propagation headers injected.
     */
    inject(): Record<string, string>;
    inject<T extends TraceContextCarrier>(carrier: T): T;
    /**
     * Format a permalink to the Braintrust application for viewing this span.
     *
     * Links can be generated at any time, but they will only become viewable
     * after the span and its root have been flushed to the server and ingested.
     *
     * This function can block resolving data with the server. For production
     * applications it's preferable to call {@link Span.link} instead.
     *
     * @returns A promise which resolves to a permalink to the span.
     */
    permalink(): Promise<string>;
    /**
     * Format a link to the Braintrust application for viewing this span.
     *
     * Links can be generated at any time, but they will only become viewable
     * after the span and its root have been flushed to the server and ingested.
     *
     * There are some conditions when a Span doesn't have enough information
     * to return a stable link (e.g. during an unresolved experiment). In this case
     * or if there's an error generating link, we'll return a placeholder link.
     *
     * @returns A link to the span.
     */
    link(): string;
    /**
     * Flush any pending rows to the server.
     */
    flush(): Promise<void>;
    /**
     * Alias for `end`.
     */
    close(args?: EndSpanArgs): number;
    /**
     * Set the span's name, type, or other attributes after it's created.
     */
    setAttributes(args: Omit<StartSpanArgs, "event">): void;
    /**
     * Start a span with a specific id and parent span ids.
     */
    startSpanWithParents(spanId: string, spanParents: string[], args?: StartSpanArgs): Span;
    state(): BraintrustState;
    kind: "span";
}
declare abstract class ContextManager {
    abstract getParentSpanIds(): ContextParentSpanIds | undefined;
    abstract runInContext<R>(span: Span, callback: () => R): R;
    abstract getCurrentSpan(): Span | undefined;
    /**
     * Returns the value to store in the ALS bound to a global hook's start event.
     * In default mode this is the Span itself; in OTEL mode it is the OTEL Context
     * containing the span so that OTEL's own ALS stores a proper Context object.
     */
    wrapSpanForStore(span: Span): unknown;
}
declare global {
    var BRAINTRUST_CONTEXT_MANAGER: (new () => ContextManager) | undefined;
    var BRAINTRUST_ID_GENERATOR: (new () => IDGenerator) | undefined;
    var BRAINTRUST_SPAN_COMPONENT: SpanComponent | undefined;
}
type SpanComponent = typeof SpanComponentsV3 | typeof SpanComponentsV4;
declare global {
    interface Global {
        [key: symbol]: any;
    }
}
declare const loginSchema: z.ZodObject<{
    appUrl: z.ZodString;
    appPublicUrl: z.ZodString;
    orgName: z.ZodString;
    apiUrl: z.ZodString;
    proxyUrl: z.ZodString;
    loginToken: z.ZodString;
    orgId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitMetadataSettings: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        collect: z.ZodEnum<["all", "none", "some"]>;
        fields: z.ZodOptional<z.ZodArray<z.ZodEnum<["commit", "branch", "tag", "dirty", "author_name", "author_email", "commit_message", "commit_time", "git_diff"]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        collect: "some" | "none" | "all";
        fields?: ("dirty" | "tag" | "commit" | "branch" | "author_name" | "author_email" | "commit_message" | "commit_time" | "git_diff")[] | undefined;
    }, {
        collect: "some" | "none" | "all";
        fields?: ("dirty" | "tag" | "commit" | "branch" | "author_name" | "author_email" | "commit_message" | "commit_time" | "git_diff")[] | undefined;
    }>>>;
    debugLogLevel: z.ZodOptional<z.ZodEnum<["error", "warn", "info", "debug"]>>;
    debugLogLevelDisabled: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    appUrl: string;
    appPublicUrl: string;
    orgName: string;
    apiUrl: string;
    proxyUrl: string;
    loginToken: string;
    orgId?: string | null | undefined;
    gitMetadataSettings?: {
        collect: "some" | "none" | "all";
        fields?: ("dirty" | "tag" | "commit" | "branch" | "author_name" | "author_email" | "commit_message" | "commit_time" | "git_diff")[] | undefined;
    } | null | undefined;
    debugLogLevel?: "error" | "warn" | "info" | "debug" | undefined;
    debugLogLevelDisabled?: boolean | undefined;
}, {
    appUrl: string;
    appPublicUrl: string;
    orgName: string;
    apiUrl: string;
    proxyUrl: string;
    loginToken: string;
    orgId?: string | null | undefined;
    gitMetadataSettings?: {
        collect: "some" | "none" | "all";
        fields?: ("dirty" | "tag" | "commit" | "branch" | "author_name" | "author_email" | "commit_message" | "commit_time" | "git_diff")[] | undefined;
    } | null | undefined;
    debugLogLevel?: "error" | "warn" | "info" | "debug" | undefined;
    debugLogLevelDisabled?: boolean | undefined;
}>;
type SerializedBraintrustState = z.infer<typeof loginSchema>;
declare class BraintrustState {
    private loginParams;
    id: string;
    currentExperiment: Experiment | undefined;
    currentLogger: Logger<false> | undefined;
    currentParent: IsoAsyncLocalStorage<string | PropagationContext>;
    currentSpan: IsoAsyncLocalStorage<Span>;
    private _bgLogger;
    private _overrideBgLogger;
    appUrl: string | null;
    appPublicUrl: string | null;
    loginToken: string | null;
    orgId: string | null;
    orgName: string | null;
    apiUrl: string | null;
    proxyUrl: string | null;
    loggedIn: boolean;
    gitMetadataSettings?: GitMetadataSettingsType;
    debugLogLevel?: DebugLogLevel;
    private debugLogLevelConfigured;
    fetch: typeof globalThis.fetch;
    private _appConn;
    private _apiConn;
    private _proxyConn;
    promptCache: PromptCache;
    parametersCache: ParametersCache;
    spanCache: SpanCache;
    private _idGenerator;
    private _contextManager;
    private _otelFlushCallback;
    spanOriginEnvironment: SpanOriginEnvironment | undefined;
    private traceContextSigningSecret;
    constructor(loginParams: LoginOptions);
    /** @internal */
    _internalSetTraceContextSigningSecret(secret: string | undefined): void;
    /** @internal */
    _internalGetTraceContextSigningSecret(): string | undefined;
    resetLoginInfo(): void;
    resetIdGenState(): void;
    [RESET_CONTEXT_MANAGER_STATE](): void;
    get idGenerator(): IDGenerator;
    get contextManager(): ContextManager;
    /**
     * Register an OTEL flush callback. This is called by @braintrust/otel
     * when it initializes a BraintrustSpanProcessor/Exporter.
     */
    registerOtelFlush(callback: () => Promise<void>): void;
    /**
     * Flush OTEL spans if a callback is registered.
     * Called during ensureSpansFlushed to ensure OTEL spans are visible in BTQL.
     */
    flushOtel(): Promise<void>;
    copyLoginInfo(other: BraintrustState): void;
    serialize(): SerializedBraintrustState;
    static deserialize(serialized: unknown, opts?: LoginOptions): BraintrustState;
    setFetch(fetch: typeof globalThis.fetch): void;
    setMaskingFunction(maskingFunction: ((value: unknown) => unknown) | null): void;
    setDebugLogLevel(option: DebugLogLevelOption): void;
    getDebugLogLevel(): DebugLogLevel | undefined;
    hasDebugLogLevelOverride(): boolean;
    login(loginParams: LoginOptions & {
        forceLogin?: boolean;
    }): Promise<void>;
    appConn(): HTTPConnection;
    apiConn(): HTTPConnection;
    proxyConn(): HTTPConnection;
    bgLogger(): BackgroundLogger;
    httpLogger(): HTTPBackgroundLogger;
    setOverrideBgLogger(logger: BackgroundLogger | null): void;
    loginReplaceApiConn(apiConn: HTTPConnection): void;
    disable(): void;
    enforceQueueSizeLimit(enforce: boolean): void;
    toJSON(): Record<string, any>;
    toString(): string;
}
declare class HTTPConnection {
    base_url: string;
    token: string | null;
    headers: Record<string, string>;
    fetch: typeof globalThis.fetch;
    constructor(base_url: string, fetch: typeof globalThis.fetch);
    setFetch(fetch: typeof globalThis.fetch): void;
    ping(): Promise<boolean>;
    make_long_lived(): void;
    static sanitize_token(token: string): string;
    set_token(token: string): void;
    _reset(): void;
    get(path: string, params?: Record<string, string | string[] | undefined> | undefined, config?: RequestInit): Promise<Response>;
    post(path: string, params?: Record<string, unknown> | string, config?: RequestInit, retries?: number): Promise<Response>;
    get_json(object_type: string, args?: Record<string, string | string[] | undefined> | undefined, retries?: number): Promise<any>;
    post_json(object_type: string, args?: Record<string, unknown> | string | undefined): Promise<any>;
    toString(): string;
}
interface ObjectMetadata {
    id: string;
    name: string;
    fullInfo: Record<string, unknown>;
}
interface ProjectExperimentMetadata {
    project: ObjectMetadata;
    experiment: ObjectMetadata;
}
interface ProjectDatasetMetadata {
    project: ObjectMetadata;
    dataset: ObjectMetadata;
}
interface OrgProjectMetadata {
    org_id: string;
    project: ObjectMetadata;
}
interface LinkArgs {
    org_name?: string;
    app_url?: string;
    project_name?: string;
    project_id?: string;
}
interface LogOptions<IsAsyncFlush> {
    asyncFlush?: IsAsyncFlush;
    computeMetadataArgs?: Record<string, any>;
    linkArgs?: LinkArgs;
}
type PromiseUnless<B, R> = B extends true ? R : Promise<Awaited<R>>;
type DatasetPipelineDeferredJSONAttachmentHook = (data: unknown, options?: {
    filename?: string;
    pretty?: boolean;
}) => object;
declare global {
    var __BT_DATASET_PIPELINE_DEFER_JSON_ATTACHMENT__: DatasetPipelineDeferredJSONAttachmentHook | undefined;
}
/**
 * An opaque W3C trace-context, as returned by
 * {@link extractTraceContextFromHeaders}.
 *
 * Carries the relevant W3C headers (`traceparent`, `baggage`, `tracestate`).
 * Callers MUST treat it as opaque and pass it straight to
 * `startSpan({ parent })`.
 */
type PropagationContext = Record<string, string>;
interface ParentSpanIds {
    spanId: string;
    rootSpanId: string;
}
interface MultiParentSpanIds {
    parentSpanIds: string[];
    rootSpanId: string;
}
declare class Logger<IsAsyncFlush extends boolean> implements Exportable {
    private state;
    private lazyMetadata;
    private _asyncFlush;
    private computeMetadataArgs;
    private _linkArgs;
    private lastStartTime;
    private lazyId;
    private calledStartSpan;
    kind: "logger";
    constructor(state: BraintrustState, lazyMetadata: LazyValue<OrgProjectMetadata>, logOptions?: LogOptions<IsAsyncFlush>);
    get org_id(): Promise<string>;
    get project(): Promise<ObjectMetadata>;
    get id(): Promise<string>;
    get loggingState(): BraintrustState;
    private parentObjectType;
    /**
     * Log a single event. The event will be batched and uploaded behind the scenes if `logOptions.asyncFlush` is true.
     *
     * @param event The event to log.
     * @param event.input: (Optional) the arguments that uniquely define a user input (an arbitrary, JSON serializable object).
     * @param event.output: (Optional) the output of your application, including post-processing (an arbitrary, JSON serializable object), that allows you to determine whether the result is correct or not. For example, in an app that generates SQL queries, the `output` should be the _result_ of the SQL query generated by the model, not the query itself, because there may be multiple valid queries that answer a single question.
     * @param event.expected: (Optional) the ground truth value (an arbitrary, JSON serializable object) that you'd compare to `output` to determine if your `output` value is correct or not. Braintrust currently does not compare `output` to `expected` for you, since there are so many different ways to do that correctly. Instead, these values are just used to help you navigate while digging into analyses. However, we may later use these values to re-score outputs or fine-tune your models.
     * @param event.error: (Optional) The error that occurred, if any. If you use tracing to run an experiment, errors are automatically logged when your code throws an exception.
     * @param event.scores: (Optional) a dictionary of numeric values (between 0 and 1) to log. The scores should give you a variety of signals that help you determine how accurate the outputs are compared to what you expect and diagnose failures. For example, a summarization app might have one score that tells you how accurate the summary is, and another that measures the word similarity between the generated and grouth truth summary. The word similarity score could help you determine whether the summarization was covering similar concepts or not. You can use these scores to help you sort, filter, and compare logs.
     * @param event.metadata: (Optional) a dictionary with additional data about the test example, model outputs, or just about anything else that's relevant, that you can use to help find and analyze examples later. For example, you could log the `prompt`, example's `id`, or anything else that would be useful to slice/dice later. The values in `metadata` can be any JSON-serializable type, but its keys must be strings.
     * @param event.metrics: (Optional) a dictionary of metrics to log. The following keys are populated automatically: "start", "end".
     * @param event.id: (Optional) a unique identifier for the event. If you don't provide one, BrainTrust will generate one for you.
     * @param options Additional logging options
     * @param options.allowConcurrentWithSpans in rare cases where you need to log at the top level separately from spans on the logger elsewhere, set this to true.
     * @returns The `id` of the logged event.
     */
    log(event: Readonly<StartSpanEventArgs>, options?: {
        allowConcurrentWithSpans?: boolean;
    }): PromiseUnless<IsAsyncFlush, string>;
    /**
     * Create a new toplevel span underneath the logger. The name defaults to "root".
     *
     * See {@link Span.traced} for full details.
     */
    traced<R>(callback: (span: Span) => R, args?: StartSpanArgs & SetCurrentArg): PromiseUnless<IsAsyncFlush, R>;
    /**
     * Lower-level alternative to `traced`. This allows you to start a span yourself, and can be useful in situations
     * where you cannot use callbacks. However, spans started with `startSpan` will not be marked as the "current span",
     * so `currentSpan()` and `traced()` will be no-ops. If you want to mark a span as current, use `traced` instead.
     *
     * See {@link traced} for full details.
     */
    startSpan(args?: StartSpanArgs): Span;
    private startSpanImpl;
    /**
     * Log feedback to an event. Feedback is used to save feedback scores, set an expected value, or add a comment.
     *
     * @param event
     * @param event.id The id of the event to log feedback for. This is the `id` returned by `log` or accessible as the `id` field of a span.
     * @param event.scores (Optional) a dictionary of numeric values (between 0 and 1) to log. These scores will be merged into the existing scores for the event.
     * @param event.expected (Optional) the ground truth value (an arbitrary, JSON serializable object) that you'd compare to `output` to determine if your `output` value is correct or not.
     * @param event.comment (Optional) an optional comment string to log about the event.
     * @param event.metadata (Optional) a dictionary with additional data about the feedback. If you have a `user_id`, you can log it here and access it in the Braintrust UI. Note, this metadata does not correspond to the main event itself, but rather the audit log attached to the event.
     * @param event.source (Optional) the source of the feedback. Must be one of "external" (default), "app", or "api".
     */
    logFeedback(event: LogFeedbackFullArgs): void;
    /**
     * Update a span in the experiment using its id. It is important that you only update a span once the original span has been fully written and flushed,
     * since otherwise updates to the span may conflict with the original span.
     *
     * @param event The event data to update the span with. Must include `id`. See {@link Experiment.log} for a full list of valid fields.
     */
    updateSpan(event: Omit<Partial<ExperimentEvent>, "id"> & Required<Pick<ExperimentEvent, "id">>): void;
    /**
     * Return a serialized representation of the logger that can be used to start subspans in other places.
     *
     * See {@link Span.startSpan} for more details.
     */
    export(): Promise<string>;
    flush(): Promise<void>;
    get asyncFlush(): IsAsyncFlush | undefined;
    /**
     * Return the base URL for links (e.g. https://braintrust.dev/app/my-org-name)
     * if we have the info, otherwise return null.
     * Resolution order: state -> linkArgs -> env var
     */
    _getLinkBaseUrl(): string | null;
    /**
     * Return this logger's Braintrust parent string (`project_id:<id>` or
     * `project_name:<name>`) for the `braintrust.parent` baggage entry, or
     * undefined when it cannot be determined synchronously.
     */
    _getOtelParent(): string | undefined;
}
interface BackgroundLoggerOpts {
    noExitFlush?: boolean;
    onFlushError?: (error: unknown) => void;
}
interface BackgroundLogger {
    log(items: LazyValue<BackgroundLogEvent>[]): void;
    flush(): Promise<void>;
    pendingFlushBytes(): number;
    flushBackpressureBytes(): number;
    setMaskingFunction(maskingFunction: ((value: unknown) => unknown) | null): void;
}
declare class HTTPBackgroundLogger implements BackgroundLogger {
    private apiConn;
    private queue;
    private activeFlush;
    private activeFlushResolved;
    private activeFlushError;
    private onFlushError?;
    private maskingFunction;
    syncFlush: boolean;
    private maxRequestSizeOverride;
    private _maxRequestSizePromise;
    defaultBatchSize: number;
    numTries: number;
    queueDropExceedingMaxsize: number;
    queueDropLoggingPeriod: number;
    failedPublishPayloadsDir: string | undefined;
    allPublishPayloadsDir: string | undefined;
    private _flushBackpressureBytes;
    private _pendingBytes;
    private _disabled;
    private queueDropLoggingState;
    constructor(apiConn: LazyValue<HTTPConnection>, opts?: BackgroundLoggerOpts);
    setMaskingFunction(maskingFunction: ((value: unknown) => unknown) | null): void;
    pendingFlushBytes(): number;
    flushBackpressureBytes(): number;
    log(items: LazyValue<BackgroundLogEvent>[]): void;
    private getMaxRequestSize;
    flush(): Promise<void>;
    private flushOnce;
    private flushWrappedItemsChunk;
    private unwrapLazyValues;
    private requestLogs3OverflowUpload;
    private _uploadLogs3OverflowPayload;
    private submitLogsRequest;
    private registerDroppedItemCount;
    private dumpDroppedEvents;
    private static writePayloadToDir;
    private triggerActiveFlush;
    private logFailedPayloadsDir;
    internalReplaceApiConn(apiConn: HTTPConnection): void;
    disable(): void;
    enforceQueueSizeLimit(enforce: boolean): void;
}
type DatasetSnapshotNameLookup = {
    snapshotName: string;
    xactId?: never;
};
type DatasetSnapshotXactLookup = {
    snapshotName?: never;
    xactId: string;
};
type DatasetSnapshotLookup = DatasetSnapshotNameLookup | DatasetSnapshotXactLookup;
type DatasetPinState = {
    lazyPinnedVersion?: LazyValue<string | undefined>;
    pinnedEnvironment?: string;
    pinnedSnapshotName?: string;
};
declare global {
    var __bt_eval_internal_btql: Record<string, unknown> | undefined;
}
/**
 * Options for logging in to Braintrust.
 */
interface LoginOptions {
    /**
     * The URL of the Braintrust App. Defaults to https://www.braintrust.dev. You should not need
     * to change this unless you are doing the "Full" deployment.
     */
    appUrl?: string;
    /**
     * The API key to use. If the parameter is not specified, will try to use the `BRAINTRUST_API_KEY` environment variable. In Node.js, if that is unset, will try the nearest `.env.braintrust` file in the current working directory or parent directories.
     */
    apiKey?: string;
    /**
     * The name of a specific organization to connect to. Since API keys are scoped to organizations, this parameter is usually
     * unnecessary unless you are logging in with a JWT.
     */
    orgName?: string;
    /**
     * A custom fetch implementation to use.
     */
    fetch?: typeof globalThis.fetch;
    /**
     * By default, the SDK installs an event handler that flushes pending writes on the `beforeExit` event.
     * If true, this event handler will _not_ be installed.
     */
    noExitFlush?: boolean;
    /**
     * Calls this function if there's an error in the background flusher.
     */
    onFlushError?: (error: unknown) => void;
    /**
     * If true, disables the local span cache used to optimize scorer access
     * to trace data. When disabled, scorers will always fetch spans from the
     * server. Defaults to false.
     */
    disableSpanCache?: boolean;
    /**
     * Controls internal Braintrust SDK troubleshooting output.
     *
     * Use `"error"`, `"warn"`, `"info"`, or `"debug"` to control how much
     * internal SDK troubleshooting output is emitted. Use `false` to explicitly
     * disable this output.
     *
     * When omitted, the SDK remains silent unless
     * `BRAINTRUST_DEBUG_LOG_LEVEL` is set to `"error"`, `"warn"`, `"info"`, or
     * `"debug"`. This option only affects local console output; it does not
     * change what data is logged to Braintrust.
     */
    debugLogLevel?: DebugLogLevel | false;
}
type WithTransactionId<R> = R & {
    [TRANSACTION_ID_FIELD]: TransactionId;
};
declare class ObjectFetcher<RecordType> implements AsyncIterable<WithTransactionId<RecordType>> {
    private objectType;
    private pinnedVersion;
    private mutateRecord?;
    private _internal_btql?;
    private _internalBrainstoreRealtime;
    private _fetchedData;
    constructor(objectType: "dataset" | "experiment" | "project_logs" | "playground_logs", pinnedVersion: string | undefined, mutateRecord?: ((r: any) => WithTransactionId<RecordType>) | undefined, _internal_btql?: Record<string, unknown> | undefined, _internalBrainstoreRealtime?: boolean);
    get id(): Promise<string>;
    protected getState(): Promise<BraintrustState>;
    protected getPinnedVersion(): string | undefined;
    protected setPinnedVersion(pinnedVersion: string | undefined): void;
    protected getInternalBtql(): Record<string, unknown> | undefined;
    private fetchRecordsFromApi;
    /**
     * Fetch all records from the object.
     *
     * @param options Optional parameters for fetching.
     * @param options.batchSize The number of records to fetch per request. Defaults to 1000.
     * @returns An async generator of records.
     */
    fetch(options?: {
        batchSize?: number;
    }): AsyncGenerator<WithTransactionId<RecordType>>;
    [Symbol.asyncIterator](): AsyncIterator<WithTransactionId<RecordType>>;
    fetchedData(options?: {
        batchSize?: number;
    }): Promise<WithTransactionId<RecordType>[]>;
    clearCache(): void;
    version(options?: {
        batchSize?: number;
    }): Promise<string | undefined>;
}
/**
 * An experiment is a collection of logged events, such as model inputs and outputs, which represent
 * a snapshot of your application at a particular point in time. An experiment is meant to capture more
 * than just the model you use, and includes the data you use to test, pre- and post- processing code,
 * comparison metrics (scores), and any other metadata you want to include.
 *
 * Experiments are associated with a project, and two experiments are meant to be easily comparable via
 * their `inputs`. You can change the attributes of the experiments in a project (e.g. scoring functions)
 * over time, simply by changing what you log.
 *
 * You should not create `Experiment` objects directly. Instead, use the `braintrust.init()` method.
 */
declare class Experiment extends ObjectFetcher<ExperimentEvent> implements Exportable {
    private readonly lazyMetadata;
    readonly dataset?: AnyDataset;
    private lastStartTime;
    private lazyId;
    private calledStartSpan;
    private state;
    kind: "experiment";
    constructor(state: BraintrustState, lazyMetadata: LazyValue<ProjectExperimentMetadata>, dataset?: AnyDataset);
    get id(): Promise<string>;
    get loggingState(): BraintrustState;
    /**
     * Wait for the experiment ID to be resolved. This is useful for ensuring the ID
     * is available synchronously in child spans (for OTEL parent attributes).
     * @internal
     */
    _waitForId(): Promise<void>;
    get name(): Promise<string>;
    get project(): Promise<ObjectMetadata>;
    _getBaseExperimentId(): Promise<string | undefined>;
    private parentObjectType;
    protected getState(): Promise<BraintrustState>;
    /**
     * Log a single event to the experiment. The event will be batched and uploaded behind the scenes.
     *
     * @param event The event to log.
     * @param event.input: The arguments that uniquely define a test case (an arbitrary, JSON serializable object). Later on, Braintrust will use the `input` to know whether two test cases are the same between experiments, so they should not contain experiment-specific state. A simple rule of thumb is that if you run the same experiment twice, the `input` should be identical.
     * @param event.output: The output of your application, including post-processing (an arbitrary, JSON serializable object), that allows you to determine whether the result is correct or not. For example, in an app that generates SQL queries, the `output` should be the _result_ of the SQL query generated by the model, not the query itself, because there may be multiple valid queries that answer a single question.
     * @param event.expected: (Optional) The ground truth value (an arbitrary, JSON serializable object) that you'd compare to `output` to determine if your `output` value is correct or not. Braintrust currently does not compare `output` to `expected` for you, since there are so many different ways to do that correctly. Instead, these values are just used to help you navigate your experiments while digging into analyses. However, we may later use these values to re-score outputs or fine-tune your models.
     * @param event.error: (Optional) The error that occurred, if any. If you use tracing to run an experiment, errors are automatically logged when your code throws an exception.
     * @param event.scores: A dictionary of numeric values (between 0 and 1) to log. The scores should give you a variety of signals that help you determine how accurate the outputs are compared to what you expect and diagnose failures. For example, a summarization app might have one score that tells you how accurate the summary is, and another that measures the word similarity between the generated and grouth truth summary. The word similarity score could help you determine whether the summarization was covering similar concepts or not. You can use these scores to help you sort, filter, and compare experiments.
     * @param event.metadata: (Optional) a dictionary with additional data about the test example, model outputs, or just about anything else that's relevant, that you can use to help find and analyze examples later. For example, you could log the `prompt`, example's `id`, or anything else that would be useful to slice/dice later. The values in `metadata` can be any JSON-serializable type, but its keys must be strings.
     * @param event.metrics: (Optional) a dictionary of metrics to log. The following keys are populated automatically: "start", "end".
     * @param event.id: (Optional) a unique identifier for the event. If you don't provide one, BrainTrust will generate one for you.
     * @param event.dataset_record_id: (Optional) the id of the dataset record that this event is associated with. This field is required if and only if the experiment is associated with a dataset. This field is unused and will be removed in a future version.
     * @param options Additional logging options
     * @param options.allowConcurrentWithSpans in rare cases where you need to log at the top level separately from spans on the experiment elsewhere, set this to true.
     * @returns The `id` of the logged event.
     */
    log(event: Readonly<ExperimentLogFullArgs>, options?: {
        allowConcurrentWithSpans?: boolean;
    }): string;
    /**
     * Create a new toplevel span underneath the experiment. The name defaults to "root".
     *
     * See {@link Span.traced} for full details.
     */
    traced<R>(callback: (span: Span) => R, args?: StartSpanArgs & SetCurrentArg): R;
    /**
     * Lower-level alternative to `traced`. This allows you to start a span yourself, and can be useful in situations
     * where you cannot use callbacks. However, spans started with `startSpan` will not be marked as the "current span",
     * so `currentSpan()` and `traced()` will be no-ops. If you want to mark a span as current, use `traced` instead.
     *
     * See {@link traced} for full details.
     */
    startSpan(args?: StartSpanArgs): Span;
    private startSpanImpl;
    fetchBaseExperiment(): Promise<{
        id: any;
        name: any;
    } | null>;
    /**
     * Summarize the experiment, including the scores (compared to the closest reference experiment) and metadata.
     *
     * @param options Options for summarizing the experiment.
     * @param options.summarizeScores Whether to summarize the scores. If False, only the metadata will be returned.
     * @param options.comparisonExperimentId The experiment to compare against. If None, the most recent experiment on the origin's main branch will be used.
     * @returns A summary of the experiment, including the scores (compared to the closest reference experiment) and metadata.
     */
    summarize(options?: {
        readonly summarizeScores?: boolean;
        readonly comparisonExperimentId?: string;
    }): Promise<ExperimentSummary>;
    /**
     * Log feedback to an event in the experiment. Feedback is used to save feedback scores, set an expected value, or add a comment.
     *
     * @param event
     * @param event.id The id of the event to log feedback for. This is the `id` returned by `log` or accessible as the `id` field of a span.
     * @param event.scores (Optional) a dictionary of numeric values (between 0 and 1) to log. These scores will be merged into the existing scores for the event.
     * @param event.expected (Optional) the ground truth value (an arbitrary, JSON serializable object) that you'd compare to `output` to determine if your `output` value is correct or not.
     * @param event.comment (Optional) an optional comment string to log about the event.
     * @param event.metadata (Optional) a dictionary with additional data about the feedback. If you have a `user_id`, you can log it here and access it in the Braintrust UI. Note, this metadata does not correspond to the main event itself, but rather the audit log attached to the event.
     * @param event.source (Optional) the source of the feedback. Must be one of "external" (default), "app", or "api".
     */
    logFeedback(event: LogFeedbackFullArgs): void;
    /**
     * Update a span in the experiment using its id. It is important that you only update a span once the original span has been fully written and flushed,
     * since otherwise updates to the span may conflict with the original span.
     *
     * @param event The event data to update the span with. Must include `id`. See {@link Experiment.log} for a full list of valid fields.
     */
    updateSpan(event: Omit<Partial<ExperimentEvent>, "id"> & Required<Pick<ExperimentEvent, "id">>): void;
    /**
     * Return a serialized representation of the experiment that can be used to start subspans in other places.
     *
     * See {@link Span.startSpan} for more details.
     */
    export(): Promise<string>;
    /**
     * Return this experiment's Braintrust parent string (`experiment_id:<id>`) for
     * the `braintrust.parent` baggage entry, or undefined when it cannot be
     * determined synchronously.
     */
    _getOtelParent(): string | undefined;
    /**
     * Flush any pending rows to the server.
     */
    flush(): Promise<void>;
    /**
     * @deprecated This function is deprecated. You can simply remove it from your code.
     */
    close(): Promise<string>;
}
/**
 * A dataset is a collection of records, such as model inputs and expected outputs, which represent
 * data you can use to evaluate and fine-tune models. You can log production data to datasets,
 * curate them with interesting examples, edit/delete records, and run evaluations against them.
 *
 * You should not create `Dataset` objects directly. Instead, use the `braintrust.initDataset()` method.
 */
declare class Dataset<IsLegacyDataset extends boolean = typeof DEFAULT_IS_LEGACY_DATASET> extends ObjectFetcher<DatasetRecord<IsLegacyDataset>> {
    private state;
    private readonly lazyMetadata;
    private readonly __braintrust_dataset_marker;
    private newRecords;
    private lazyPinnedVersion?;
    private pinnedEnvironment?;
    private pinnedSnapshotName?;
    constructor(state: BraintrustState, lazyMetadata: LazyValue<ProjectDatasetMetadata>, pinnedVersion?: string, legacy?: IsLegacyDataset, _internal_btql?: Record<string, unknown>, pinState?: DatasetPinState);
    get id(): Promise<string>;
    get name(): Promise<string>;
    get project(): Promise<ObjectMetadata>;
    get loggingState(): BraintrustState;
    toEvalData(): Promise<{
        dataset_id: string;
        dataset_version?: string;
        dataset_environment?: string;
        dataset_snapshot_name?: string;
        _internal_btql?: Record<string, unknown>;
    }>;
    protected getState(): Promise<BraintrustState>;
    version(options?: {
        batchSize?: number;
    }): Promise<string | undefined>;
    private validateEvent;
    private createArgs;
    /**
     * Insert a single record to the dataset. The record will be batched and uploaded behind the scenes. If you pass in an `id`,
     * and a record with that `id` already exists, it will be overwritten (upsert).
     *
     * @param event The event to log.
     * @param event.input The argument that uniquely define an input case (an arbitrary, JSON serializable object).
     * @param event.expected The output of your application, including post-processing (an arbitrary, JSON serializable object).
     * @param event.tags (Optional) a list of strings that you can use to filter and group records later.
     * @param event.metadata (Optional) a dictionary with additional data about the test example, model outputs, or just
     * about anything else that's relevant, that you can use to help find and analyze examples later. For example, you could log the
     * `prompt`, example's `id`, or anything else that would be useful to slice/dice later. The values in `metadata` can be any
     * JSON-serializable type, but its keys must be strings.
     * @param event.origin (Optional) a reference to the source object this dataset record was derived from.
     * @param event.id (Optional) a unique identifier for the event. If you don't provide one, Braintrust will generate one for you.
     * @param event.output: (Deprecated) The output of your application. Use `expected` instead.
     * @returns The `id` of the logged record.
     */
    insert({ input, expected, metadata, tags, id, output, origin, }: {
        readonly input?: unknown;
        readonly expected?: unknown;
        readonly tags?: string[];
        readonly metadata?: Record<string, unknown>;
        readonly id?: string;
        readonly output?: unknown;
        readonly origin?: ObjectReferenceType$1;
    }): string;
    /**
     * Update fields of a single record in the dataset. The updated fields will be batched and uploaded behind the scenes.
     * You must pass in an `id` of the record to update. Only the fields provided will be updated; other fields will remain unchanged.
     *
     * @param event The fields to update in the record.
     * @param event.id The unique identifier of the record to update.
     * @param event.input (Optional) The new input value for the record (an arbitrary, JSON serializable object).
     * @param event.expected (Optional) The new expected output value for the record (an arbitrary, JSON serializable object).
     * @param event.tags (Optional) A list of strings to update the tags of the record.
     * @param event.metadata (Optional) A dictionary to update the metadata of the record. The values in `metadata` can be any
     * JSON-serializable type, but its keys must be strings.
     * @returns The `id` of the updated record.
     */
    update({ input, expected, metadata, tags, id, }: {
        readonly id: string;
        readonly input?: unknown;
        readonly expected?: unknown;
        readonly tags?: string[];
        readonly metadata?: Record<string, unknown>;
    }): string;
    delete(id: string): string;
    createSnapshot({ name, description, update, }: {
        readonly name: string;
        readonly description?: string;
        readonly update?: boolean;
    }): Promise<DatasetSnapshotType>;
    listSnapshots(): Promise<DatasetSnapshotType[]>;
    getSnapshot(lookup: DatasetSnapshotLookup): Promise<DatasetSnapshotType | undefined>;
    updateSnapshot(snapshotId: string, { name, description, }: {
        readonly name?: string;
        readonly description?: string | null;
    }): Promise<DatasetSnapshotType>;
    deleteSnapshot(snapshotId: string): Promise<DatasetSnapshotType>;
    restorePreview({ version, }: {
        readonly version: string;
    }): Promise<DatasetRestorePreviewResult>;
    restore({ version, }: {
        readonly version: string;
    }): Promise<DatasetRestoreResult>;
    /**
     * Summarize the dataset, including high level metrics about its size and other metadata.
     * @param summarizeData Whether to summarize the data. If false, only the metadata will be returned.
     * @returns `DatasetSummary`
     * @returns A summary of the dataset.
     */
    summarize(options?: {
        readonly summarizeData?: boolean;
    }): Promise<DatasetSummary>;
    /**
     * Flush any pending rows to the server.
     */
    flush(): Promise<void>;
    /**
     * @deprecated This function is deprecated. You can simply remove it from your code.
     */
    close(): Promise<string>;
    static isDataset(data: unknown): data is Dataset;
}
type CompiledPromptResponseFormat = Exclude<AnyModelParamsType["response_format"], null> extends infer ResponseFormat ? ResponseFormat extends {
    type: "json_schema";
    json_schema: infer JsonSchema;
} ? Omit<ResponseFormat, "json_schema"> & {
    json_schema: Omit<Extract<JsonSchema, ResponseFormatJsonSchemaType>, "schema"> & {
        schema?: Record<string, unknown>;
    };
} : ResponseFormat : never;
type CompiledPromptReasoningEffort = Exclude<AnyModelParamsType["reasoning_effort"], "none">;
type CompiledPromptParams = Omit<NonNullable<PromptDataType["options"]>["params"], "use_cache" | "response_format" | "reasoning_effort"> & Omit<AnyModelParamsType, "use_cache" | "response_format" | "reasoning_effort"> & {
    reasoning_effort?: CompiledPromptReasoningEffort;
    response_format?: CompiledPromptResponseFormat;
    model: NonNullable<NonNullable<PromptDataType["options"]>["model"]>;
};
type ChatPrompt = {
    messages: ChatCompletionOpenAIMessageParamType[];
    tools?: ChatCompletionToolType[];
};
type CompletionPrompt = {
    prompt: string;
};
type CompiledPrompt<Flavor extends "chat" | "completion"> = CompiledPromptParams & {
    span_info?: {
        name?: string;
        spanAttributes?: Record<any, any>;
        metadata: {
            prompt: {
                variables: Record<string, unknown>;
                id: string;
                project_id: string;
                version: string;
            };
        };
    };
} & (Flavor extends "chat" ? ChatPrompt : Flavor extends "completion" ? CompletionPrompt : {});
type DefaultPromptArgs = Partial<CompiledPromptParams & AnyModelParamsType & ChatPrompt & CompletionPrompt>;
type PromptRowWithId<HasId extends boolean = true, HasVersion extends boolean = true> = Omit<PromptType, "log_id" | "org_id" | "project_id" | "id" | "_xact_id"> & Partial<Pick<PromptType, "project_id">> & (HasId extends true ? Pick<PromptType, "id"> : Partial<Pick<PromptType, "id">>) & (HasVersion extends true ? Pick<PromptType, "_xact_id"> : Partial<Pick<PromptType, "_xact_id">>);
declare class Prompt<HasId extends boolean = true, HasVersion extends boolean = true> {
    private metadata;
    private defaults;
    private noTrace;
    private parsedPromptData;
    private hasParsedPromptData;
    private readonly __braintrust_prompt_marker;
    constructor(metadata: PromptRowWithId<HasId, HasVersion> | PromptSessionEventType, defaults: DefaultPromptArgs, noTrace: boolean);
    get id(): HasId extends true ? string : string | undefined;
    get projectId(): string | undefined;
    get name(): string;
    get slug(): string;
    get prompt(): PromptDataType["prompt"];
    get version(): HasId extends true ? TransactionId : TransactionId | undefined;
    get options(): NonNullable<PromptDataType["options"]>;
    get templateFormat(): string | null | undefined;
    get promptData(): PromptDataType;
    /**
     * Build the prompt with the given formatting options. The args you pass in will
     * be forwarded to the mustache template that defines the prompt and rendered with
     * the `mustache-js` library.
     *
     * @param buildArgs Args to forward along to the prompt template.
     */
    build<Flavor extends "chat" | "completion" = "chat">(buildArgs: unknown, options?: {
        flavor?: Flavor;
        messages?: ChatCompletionMessageParamType[];
        strict?: boolean;
        templateFormat?: TemplateFormat;
    }): CompiledPrompt<Flavor>;
    /**
     * This is a special build method that first resolves attachment references, and then
     * calls the regular build method. You should use this if you are building prompts from
     * dataset rows that contain attachments.
     *
     * @param buildArgs Args to forward along to the prompt template.
     */
    buildWithAttachments<Flavor extends "chat" | "completion" = "chat">(buildArgs: unknown, options?: {
        flavor?: Flavor;
        messages?: ChatCompletionMessageParamType[];
        strict?: boolean;
        state?: BraintrustState;
        templateFormat?: TemplateFormat;
    }): Promise<CompiledPrompt<Flavor>>;
    private runBuild;
    static renderPrompt({ prompt, buildArgs, options, }: {
        prompt: PromptBlockDataType;
        buildArgs: unknown;
        options: {
            strict?: boolean;
            messages?: ChatCompletionMessageParamType[];
            templateFormat?: TemplateFormat;
        };
    }): PromptBlockDataType;
    private getParsedPromptData;
    static isPrompt(data: unknown): data is Prompt<boolean, boolean>;
    static fromPromptData(name: string, promptData: PromptDataType): Prompt<false, false>;
}
declare class RemoteEvalParameters<HasId extends boolean = true, HasVersion extends boolean = true, T extends Record<string, unknown> = Record<string, unknown>> {
    private metadata;
    private readonly __braintrust_parameters_marker;
    constructor(metadata: ParametersRow);
    get id(): HasId extends true ? string : string | undefined;
    get projectId(): string | undefined;
    get name(): string;
    get slug(): string;
    get version(): HasVersion extends true ? TransactionId : TransactionId | undefined;
    get schema(): Record<string, unknown>;
    get data(): T;
    validate(data: unknown): boolean;
    static isParameters(x: unknown): x is RemoteEvalParameters<boolean, boolean, Record<string, unknown>>;
}
type AnyDataset = Dataset<boolean>;
/**
 * Summary of a score's performance.
 * @property name Name of the score.
 * @property score Average score across all examples.
 * @property diff Difference in score between the current and reference experiment.
 * @property improvements Number of improvements in the score.
 * @property regressions Number of regressions in the score.
 */
interface ScoreSummary {
    name: string;
    score: number;
    diff?: number;
    improvements: number;
    regressions: number;
}
/**
 * Summary of a metric's performance.
 * @property name Name of the metric.
 * @property metric Average metric across all examples.
 * @property unit Unit label for the metric.
 * @property diff Difference in metric between the current and reference experiment.
 * @property improvements Number of improvements in the metric.
 * @property regressions Number of regressions in the metric.
 */
interface MetricSummary {
    name: string;
    metric: number;
    unit: string;
    diff?: number;
    improvements: number;
    regressions: number;
}
/**
 * Summary of an experiment's scores and metadata.
 * @property projectName Name of the project that the experiment belongs to.
 * @property experimentName Name of the experiment.
 * @property experimentId ID of the experiment. May be `undefined` if the eval was run locally.
 * @property projectUrl URL to the project's page in the Braintrust app.
 * @property experimentUrl URL to the experiment's page in the Braintrust app.
 * @property comparisonExperimentName The experiment scores are baselined against.
 * @property scores Summary of the experiment's scores.
 */
interface ExperimentSummary {
    projectName: string;
    experimentName: string;
    projectId?: string;
    experimentId?: string;
    projectUrl?: string;
    experimentUrl?: string;
    comparisonExperimentName?: string;
    scores: Record<string, ScoreSummary>;
    metrics?: Record<string, MetricSummary>;
}
/**
 * Summary of a dataset's data.
 *
 * @property totalRecords Total records in the dataset.
 */
interface DataSummary {
    /**
     * New or updated records added in this session.
     */
    newRecords: number;
    /**
     * Total records in the dataset.
     */
    totalRecords: number;
}
/**
 * Summary of a dataset's scores and metadata.
 *
 * @property projectName Name of the project that the dataset belongs to.
 * @property datasetName Name of the dataset.
 * @property projectUrl URL to the project's page in the Braintrust app.
 * @property datasetUrl URL to the experiment's page in the Braintrust app.
 * @property dataSummary Summary of the dataset's data.
 */
interface DatasetSummary {
    projectName: string;
    datasetName: string;
    projectUrl: string;
    datasetUrl: string;
    dataSummary: DataSummary | undefined;
}

type OpenAIAgentsSpanDataBase = {
    type: string;
};
type OpenAIAgentsAgentSpanData = OpenAIAgentsSpanDataBase & {
    type: "agent";
    name: string;
    handoffs?: string[];
    tools?: string[];
    output_type?: string;
};
type OpenAIAgentsFunctionSpanData = OpenAIAgentsSpanDataBase & {
    type: "function";
    name: string;
    input: string;
    output: string;
    mcp_data?: string;
};
type OpenAIAgentsGenerationSpanData = OpenAIAgentsSpanDataBase & {
    type: "generation";
    input?: Array<Record<string, unknown>>;
    output?: Array<Record<string, unknown>>;
    model?: string;
    model_config?: Record<string, unknown>;
    usage?: Record<string, unknown>;
};
type OpenAIAgentsResponseSpanData = OpenAIAgentsSpanDataBase & {
    type: "response";
    response_id?: string;
    _input?: string | Record<string, unknown>[];
    _response?: Record<string, unknown>;
};
type OpenAIAgentsHandoffSpanData = OpenAIAgentsSpanDataBase & {
    type: "handoff";
    from_agent?: string;
    to_agent?: string;
};
type OpenAIAgentsCustomSpanData = OpenAIAgentsSpanDataBase & {
    type: "custom";
    name: string;
    data: Record<string, unknown>;
};
type OpenAIAgentsGuardrailSpanData = OpenAIAgentsSpanDataBase & {
    type: "guardrail";
    name: string;
    triggered: boolean;
};
type OpenAIAgentsTranscriptionSpanData = OpenAIAgentsSpanDataBase & {
    type: "transcription";
    input: {
        data: string;
        format: "pcm" | string;
    };
    output?: string;
    model?: string;
    model_config?: Record<string, unknown>;
};
type OpenAIAgentsSpeechSpanData = OpenAIAgentsSpanDataBase & {
    type: "speech";
    input?: string;
    output: {
        data: string;
        format: "pcm" | string;
    };
    model?: string;
    model_config?: Record<string, unknown>;
};
type OpenAIAgentsSpeechGroupSpanData = OpenAIAgentsSpanDataBase & {
    type: "speech_group";
    input?: string;
};
type OpenAIAgentsMCPListToolsSpanData = OpenAIAgentsSpanDataBase & {
    type: "mcp_tools";
    server?: string;
    result?: string[];
};
type OpenAIAgentsSpanData = OpenAIAgentsAgentSpanData | OpenAIAgentsFunctionSpanData | OpenAIAgentsGenerationSpanData | OpenAIAgentsResponseSpanData | OpenAIAgentsHandoffSpanData | OpenAIAgentsCustomSpanData | OpenAIAgentsGuardrailSpanData | OpenAIAgentsTranscriptionSpanData | OpenAIAgentsSpeechSpanData | OpenAIAgentsSpeechGroupSpanData | OpenAIAgentsMCPListToolsSpanData;
type OpenAIAgentsTrace = {
    type: "trace";
    traceId: string;
    name: string;
    groupId: string | null;
    metadata?: Record<string, unknown>;
};
type OpenAIAgentsSpan<TData extends OpenAIAgentsSpanData = OpenAIAgentsSpanData> = {
    type: "trace.span";
    traceId: string;
    spanData: TData;
    spanId: string;
    parentId: string | null;
    startedAt: string | null;
    endedAt: string | null;
    error: {
        message: string;
        data?: Record<string, unknown>;
    } | null;
};

type SpanInput = string | Array<Record<string, unknown>> | Record<string, unknown>[];
type SpanOutput = string | Array<Record<string, unknown>> | Record<string, unknown>;
type TraceMetadata = {
    firstInput: SpanInput | null;
    lastOutput: SpanOutput | null;
};
interface OpenAIAgentsTraceProcessorOptions {
    logger?: Logger<any>;
    maxTraces?: number;
}
/**
 * Converts OpenAI Agents SDK trace processor lifecycle events into Braintrust spans.
 */
declare class OpenAIAgentsTraceProcessor {
    private static readonly DEFAULT_MAX_TRACES;
    private logger?;
    private maxTraces;
    private traceSpans;
    private traceOrder;
    readonly _traceSpans: Map<string, {
        rootSpan: Span;
        childSpans: Map<string, Span>;
        metadata: TraceMetadata;
    }>;
    constructor(options?: OpenAIAgentsTraceProcessorOptions);
    private evictOldestTrace;
    onTraceStart(trace: OpenAIAgentsTrace): Promise<void>;
    onTraceEnd(trace: OpenAIAgentsTrace): Promise<void>;
    onSpanStart(span: OpenAIAgentsSpan): Promise<void>;
    onSpanEnd(span: OpenAIAgentsSpan): Promise<void>;
    shutdown(): Promise<void>;
    forceFlush(): Promise<void>;
    private extractLogData;
    private extractAgentLogData;
    private extractResponseLogData;
    private extractFunctionLogData;
    private extractHandoffLogData;
    private extractGuardrailLogData;
    private extractGenerationLogData;
    private extractCustomLogData;
    private extractMCPListToolsLogData;
    private extractTranscriptionLogData;
    private extractSpeechLogData;
    private extractSpeechGroupLogData;
    private extractTimingMetrics;
    private omitKeys;
}

/**
 * Vendored types for @flue/runtime observe/instrument-based instrumentation.
 *
 * Keep this surface intentionally narrow. These types are not exported to SDK
 * users and should only cover fields we read, correlate, or log.
 */
type FlueOperationKind = "prompt" | "skill" | "task" | "compact";
interface FlueContext {
    readonly id?: string;
    readonly runId?: string;
}
type FlueExecutionOperation = {
    type: "workflow";
    runId: string;
    workflowName: string;
    phase: "start" | "resume";
    startedAt: string;
} | {
    type: "agent";
    operationId: string;
    operationKind: FlueOperationKind;
} | {
    type: "model";
    turnId: string;
} | {
    type: "tool";
    toolCallId: string;
    toolName: string;
} | {
    type: "task";
    taskId: string;
} | {
    type: "coordinator";
    phase: "reconcile";
};
interface FlueTraceCarrier {
    traceparent: string;
    tracestate?: string;
}
interface FlueExecutionContext {
    eventContext?: FlueContext;
    runId?: string;
    instanceId?: string;
    submissionId?: string;
    dispatchId?: string;
    agentName?: string;
    conversationId?: string;
    harness?: string;
    session?: string;
    operationId?: string;
    turnId?: string;
    taskId?: string;
    traceCarrier?: FlueTraceCarrier;
}
type FlueExecutionInterceptor = <T>(operation: FlueExecutionOperation, ctx: FlueExecutionContext, next: () => Promise<T>) => Promise<T>;
interface FlueInstrumentation {
    key?: symbol;
    observe(event: unknown, ctx?: unknown): void | Promise<void>;
    interceptor: FlueExecutionInterceptor;
    dispose(): void | Promise<void>;
}

type FlueObserver = (event: unknown, ctx?: unknown) => void;
type BraintrustFlueObserver = FlueObserver & FlueInstrumentation;
/**
 * Manual instrumentation for flue.
 *
 * This should be passed to flue's `instrument()` API if not using auto-instrumentation: `instrument(braintrustFlueInstrumentation())`
 */
declare function braintrustFlueInstrumentation(): FlueInstrumentation;
/**
 * Observer for flue pre version 1.0.0.
 *
 * This observer should be passed to flue's `observe()` API if not using auto-instrumentation.
 */
declare const braintrustFlueObserver: BraintrustFlueObserver;

/**
 * Vendored types for eve's authored hook APIs.
 *
 * Keep this surface intentionally narrow. These types are not exported to SDK
 * users and should only cover fields we read, correlate, or log.
 */
type EveJsonValue = null | boolean | number | string | EveJsonValue[] | {
    readonly [key: string]: EveJsonValue;
};
type EveJsonObject = {
    readonly [key: string]: EveJsonValue;
};
interface EveHookContext {
    readonly session: {
        readonly id: string;
        readonly parent?: {
            readonly callId?: string;
            readonly sessionId?: string;
            readonly turn?: {
                readonly id?: string;
            };
        };
    };
}
type EveAssistantStepFinishReason = "content-filter" | "error" | "length" | "other" | "stop" | "tool-calls";
interface EveStreamEventMeta {
    readonly at: string;
}
interface EveRuntimeToolCallActionRequest {
    readonly callId: string;
    readonly input: EveJsonObject;
    readonly kind: "tool-call";
    readonly toolName: string;
}
interface EveRuntimeToolResultActionResult {
    readonly callId: string;
    readonly isError?: boolean;
    readonly kind: "tool-result";
    readonly output: EveJsonValue;
    readonly toolName: string;
}
type EveRuntimeActionRequest = EveRuntimeToolCallActionRequest | {
    readonly callId: string;
    readonly input?: EveJsonObject;
    readonly kind: "load-skill" | "remote-agent-call";
    readonly name?: string;
} | {
    readonly callId: string;
    readonly input: EveJsonObject;
    readonly kind: "subagent-call";
    readonly name?: string;
    readonly subagentName?: string;
};
type EveRuntimeActionResult = EveRuntimeToolResultActionResult | {
    readonly callId: string;
    readonly isError?: boolean;
    readonly kind: "load-skill-result";
    readonly output?: EveJsonValue;
    readonly name?: string;
} | {
    readonly callId: string;
    readonly isError?: boolean;
    readonly kind: "subagent-result";
    readonly output?: EveJsonValue;
    readonly subagentName?: string;
};
type EveActionResultStatus = "completed" | "failed" | "rejected";
interface EveActionResultError {
    readonly code: string;
    readonly message: string;
}
type EveHandleMessageStreamEvent = {
    readonly data: {
        readonly invocation?: unknown;
        readonly runtime?: {
            readonly agentId: string;
            readonly agentName?: string;
            readonly eveVersion: string;
            readonly modelId: string;
        };
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "session.started";
} | {
    readonly data: {
        readonly sequence: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "turn.started";
} | {
    readonly data: {
        readonly sequence: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "turn.completed";
} | {
    readonly data: {
        readonly message: string;
        readonly sequence: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "message.received";
} | {
    readonly data: {
        readonly finishReason: EveAssistantStepFinishReason;
        readonly message: string | null;
        readonly sequence: number;
        readonly stepIndex: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "message.completed";
} | {
    readonly data: {
        readonly reasoning: string;
        readonly sequence: number;
        readonly stepIndex: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "reasoning.completed";
} | {
    readonly data: {
        readonly result: EveJsonValue;
        readonly sequence: number;
        readonly stepIndex: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "result.completed";
} | {
    readonly data: {
        readonly sequence: number;
        readonly stepIndex: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "step.started";
} | {
    readonly data: {
        readonly finishReason: EveAssistantStepFinishReason;
        readonly providerMetadata?: {
            readonly gateway?: {
                readonly generationId?: string;
            };
        };
        readonly sequence: number;
        readonly stepIndex: number;
        readonly turnId: string;
        readonly usage?: {
            readonly cacheReadTokens?: number;
            readonly cacheWriteTokens?: number;
            readonly costUsd?: number;
            readonly inputTokens?: number;
            readonly outputTokens?: number;
        };
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "step.completed";
} | {
    readonly data: {
        readonly code: string;
        readonly details?: EveJsonObject;
        readonly message: string;
        readonly sequence: number;
        readonly stepIndex: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "step.failed";
} | {
    readonly data: {
        readonly actions: readonly EveRuntimeActionRequest[];
        readonly sequence: number;
        readonly stepIndex: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "actions.requested";
} | {
    readonly data: {
        readonly error?: EveActionResultError;
        readonly result: EveRuntimeActionResult;
        readonly sequence: number;
        readonly stepIndex: number;
        readonly status: EveActionResultStatus;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "action.result";
} | {
    readonly data: {
        readonly callId: string;
        readonly childSessionId: string;
        readonly name: string;
        readonly remote?: {
            readonly url?: string;
        };
        readonly sequence: number;
        readonly toolName?: string;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "subagent.called";
} | {
    readonly data: {
        readonly callId: string;
        readonly error?: EveActionResultError;
        readonly output?: EveJsonValue;
        readonly sequence: number;
        readonly status?: EveActionResultStatus;
        readonly subagentName: string;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "subagent.completed";
} | {
    readonly data: {
        readonly code: string;
        readonly details?: EveJsonObject;
        readonly message: string;
        readonly sequence: number;
        readonly turnId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "turn.failed";
} | {
    readonly data: {
        readonly code: string;
        readonly details?: EveJsonObject;
        readonly message: string;
        readonly sessionId: string;
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "session.failed";
} | {
    readonly data: {
        readonly wait: "next-user-message";
    };
    readonly meta?: EveStreamEventMeta;
    readonly type: "session.waiting";
} | {
    readonly meta?: EveStreamEventMeta;
    readonly type: "session.completed";
};
interface EveHookDefinition {
    readonly events?: {
        readonly "*"?: (event: EveHandleMessageStreamEvent, ctx: EveHookContext) => void | Promise<void>;
        readonly [eventType: string]: ((event: EveHandleMessageStreamEvent, ctx: EveHookContext) => void | Promise<void>) | undefined;
    };
}
interface EveInstrumentationSetupContext {
    readonly agentName: string;
}
type EveTextPart = {
    readonly text: string;
    readonly type: "text";
};
type EveImagePart = {
    readonly image: unknown;
    readonly mediaType?: string;
    readonly type: "image";
};
type EveFilePart = {
    readonly data: unknown;
    readonly filename?: string;
    readonly mediaType: string;
    readonly type: "file";
};
type EveReasoningPart = {
    readonly text: string;
    readonly type: "reasoning";
};
type EveReasoningFilePart = {
    readonly data: unknown;
    readonly mediaType: string;
    readonly type: "reasoning-file";
};
type EveCustomPart = {
    readonly kind: `${string}.${string}`;
    readonly type: "custom";
};
type EveToolCallPart = {
    readonly input: unknown;
    readonly providerExecuted?: boolean;
    readonly toolCallId: string;
    readonly toolName: string;
    readonly type: "tool-call";
};
type EveToolResultContentPart = EveTextPart | EveFilePart | {
    readonly data: string;
    readonly filename?: string;
    readonly mediaType: string;
    readonly type: "file-data";
} | {
    readonly mediaType?: string;
    readonly type: "file-url";
    readonly url: string;
} | {
    readonly fileId: string | Readonly<Record<string, string>>;
    readonly type: "file-id" | "image-file-id";
} | {
    readonly providerReference: Readonly<Record<string, string>>;
    readonly type: "file-reference" | "image-file-reference";
} | {
    readonly data: string;
    readonly mediaType: string;
    readonly type: "image-data";
} | {
    readonly type: "image-url";
    readonly url: string;
} | {
    readonly type: "custom";
};
type EveToolResultOutput = {
    readonly type: "text" | "error-text";
    readonly value: string;
} | {
    readonly type: "json" | "error-json";
    readonly value: EveJsonValue;
} | {
    readonly reason?: string;
    readonly type: "execution-denied";
} | {
    readonly type: "content";
    readonly value: readonly EveToolResultContentPart[];
};
type EveToolResultPart = {
    readonly output: EveToolResultOutput;
    readonly toolCallId: string;
    readonly toolName: string;
    readonly type: "tool-result";
};
type EveToolApprovalRequest = {
    readonly approvalId: string;
    readonly isAutomatic?: boolean;
    readonly signature?: string;
    readonly toolCallId: string;
    readonly type: "tool-approval-request";
};
type EveToolApprovalResponse = {
    readonly approvalId: string;
    readonly approved: boolean;
    readonly providerExecuted?: boolean;
    readonly reason?: string;
    readonly type: "tool-approval-response";
};
type EveSystemModelMessage = {
    readonly content: string;
    readonly role: "system";
};
type EveModelMessage = EveSystemModelMessage | {
    readonly content: string | readonly (EveTextPart | EveImagePart | EveFilePart)[];
    readonly role: "user";
} | {
    readonly content: string | readonly (EveTextPart | EveCustomPart | EveFilePart | EveReasoningPart | EveReasoningFilePart | EveToolCallPart | EveToolResultPart | EveToolApprovalRequest)[];
    readonly role: "assistant";
} | {
    readonly content: readonly (EveToolResultPart | EveToolApprovalResponse)[];
    readonly role: "tool";
};
interface EveInstrumentationModelInput {
    readonly instructions?: string | readonly EveSystemModelMessage[];
    readonly messages: readonly EveModelMessage[];
}
interface EveInstrumentationStepStartedEventInput {
    readonly modelInput: EveInstrumentationModelInput;
    readonly session: {
        readonly id: string;
    };
    readonly step: {
        readonly index: number;
    };
    readonly turn: {
        readonly id: string;
        readonly sequence: number;
    };
}
interface EveInstrumentationDefinition {
    readonly events?: {
        readonly "step.started"?: (input: EveInstrumentationStepStartedEventInput) => void | {
            readonly runtimeContext?: EveJsonObject;
        };
        readonly [eventType: string]: ((input: EveInstrumentationStepStartedEventInput) => void | {
            readonly runtimeContext?: EveJsonObject;
        }) | undefined;
    };
    readonly recordInputs?: boolean;
    readonly recordOutputs?: boolean;
    readonly setup?: (context: EveInstrumentationSetupContext) => void;
}

type EveStateHandle<T> = {
    get(): T;
    update(fn: (current: T) => T): void;
};
type EveDefineState = <T>(name: string, initial: () => T) => EveStateHandle<T>;
/** Manual hook instrumentation for eve runtime stream events. */
declare function braintrustEveHook(options: {
    defineState: EveDefineState;
    metadata?: Record<string, unknown>;
}): EveHookDefinition;
/** Eve instrumentation helper for logger setup and durable LLM input capture. */
declare function braintrustEveInstrumentation(options: {
    defineState: EveDefineState;
    setup?: EveInstrumentationDefinition["setup"];
}): EveInstrumentationDefinition;

/**
 * Plugin registry and configuration for auto-instrumentation.
 *
 * Plugins are automatically enabled when the Braintrust library is loaded.
 * Users can disable specific integrations programmatically or via environment variables.
 */

/**
 * Configure auto-instrumentation.
 *
 * This must be called before importing any AI SDKs to take effect.
 *
 * @example
 * ```typescript
 * import { configureInstrumentation } from 'braintrust';
 *
 * // Disable OpenAI instrumentation
 * configureInstrumentation({
 *   integrations: { openai: false }
 * });
 *
 * // Now import SDKs
 * import OpenAI from 'openai';
 * ```
 *
 * Environment variables can also be used:
 * ```bash
 * # Disable single SDK
 * BRAINTRUST_DISABLE_INSTRUMENTATION=openai node app.js
 *
 * # Disable multiple SDKs
 * BRAINTRUST_DISABLE_INSTRUMENTATION=openai,anthropic node app.js
 * ```
 */
declare function configureInstrumentation(config: InstrumentationConfig): void;

export { type AsyncEndEvent, type AsyncStartEvent, type BaseContext, BasePlugin, BraintrustPlugin, type BraintrustPluginConfig, type ChannelHandlers, type EndEvent, type ErrorEvent, type InstrumentationConfig, OpenAIAgentsTraceProcessor, type OpenAIAgentsTraceProcessorOptions, type StartEvent, braintrustEveHook, braintrustEveInstrumentation, braintrustFlueInstrumentation, braintrustFlueObserver, configureInstrumentation, createChannelName, isValidChannelName, parseChannelName };
