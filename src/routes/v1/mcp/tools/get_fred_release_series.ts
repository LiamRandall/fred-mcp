import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "api_key": z.string(),

    "release_id": z.string(),

    "file_type": z.string().optional(),

    "realtime_start": z.string().optional(),

    "realtime_end": z.string().optional(),

    "limit": z.string().optional(),

    "offset": z.string().optional(),

    "order_by": z.string().optional(),

    "sort_order": z.string().optional(),

    "filter_variable": z.string().optional(),

    "filter_value": z.string().optional(),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_release_series",
    "GET /fred/release/series",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/release/series`,
          method: 'GET',
          query: {
            "api_key": args["api_key"] ?? "",
            "filter_variable": args["filter_variable"] ?? "",
            "file_type": args["file_type"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "order_by": args["order_by"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "limit": args["limit"] ?? "",
            "release_id": args["release_id"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "filter_value": args["filter_value"] ?? "",
            "offset": args["offset"] ?? "",
          },
        })
        .then((response: Response) => response.text());

        return {
          content: [
            {
              type: "text",
              text: response,
            },
          ],
        };
      } catch (error) {
        console.error(`Error executing get_fred_release_series:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_release_series: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
