import ExperimentalCycles "mo:base/ExperimentalCycles";

import Text "mo:base/Text";
import Error "mo:base/Error";
import HTTP "mo:base/Http";
import Cycles "mo:base/ExperimentalCycles";

actor GEMS {
    private let ANTHROPIC_API_KEY = "your_api_key_here"; // Replace with your actual API key
    private let ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

    public func generateDesign(prompt : Text) : async Text {
        let body = "{"
            # "\"model\": \"claude-3-sonnet-20240229\","
            # "\"max_tokens\": 4000,"
            # "\"messages\": ["
            # "  {\"role\": \"user\", \"content\": \"" # prompt # "\"}"
            # "]"
            # "}";

        let request_headers = [
            ("Content-Type", "application/json"),
            ("x-api-key", ANTHROPIC_API_KEY),
            ("anthropic-version", "2023-06-01")
        ];

        Cycles.add(220_000_000_000); // Add cycles for the HTTP outcall

        let response = await HTTP.post(ANTHROPIC_API_URL, body, request_headers);

        switch (response) {
            case (#Ok(response_ok)) {
                // Parse the response and extract the generated text
                // This is a simplified version; you may need to implement proper JSON parsing
                let response_body = response_ok.body;
                return Text.decodeUtf8(response_body);
            };
            case (#Err(error)) {
                throw Error.reject("HTTP request failed: " # debug_show(error));
            };
        };
    };
}