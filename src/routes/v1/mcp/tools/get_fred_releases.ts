import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "api_key": z.string(),

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
    "get_fred_releases",
    "GET /fred/releases",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/releases`,
          method: 'GET',
          query: {
            "filter_value": args["filter_value"] ?? "",
            "api_key": args["api_key"] ?? "",
            "offset": args["offset"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "limit": args["limit"] ?? "",
            "file_type": args["file_type"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "filter_variable": args["filter_variable"] ?? "",
            "order_by": args["order_by"] ?? "",
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
        console.error(`Error executing get_fred_releases:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_releases: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
