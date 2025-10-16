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

    "search_text": z.string().optional(),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_release_tags",
    "GET /fred/release/tags",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/release/tags`,
          method: 'GET',
          query: {
            "realtime_end": args["realtime_end"] ?? "",
            "file_type": args["file_type"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "search_text": args["search_text"] ?? "",
            "release_id": args["release_id"] ?? "",
            "api_key": args["api_key"] ?? "",
            "offset": args["offset"] ?? "",
            "order_by": args["order_by"] ?? "",
            "limit": args["limit"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
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
        console.error(`Error executing get_fred_release_tags:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_release_tags: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
