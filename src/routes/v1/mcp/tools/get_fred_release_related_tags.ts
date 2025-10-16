import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "api_key": z.string(),

    "release_id": z.string(),

    "file_type": z.string().optional(),

    "tag_names": z.string(),

    "realtime_start": z.string().optional(),

    "realtime_end": z.string().optional(),

    "limit": z.string().optional(),

    "offset": z.string().optional(),

    "order_by": z.string().optional(),

    "sort_order": z.string().optional(),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_release_related_tags",
    "GET /fred/release/related_tags",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/release/related_tags`,
          method: 'GET',
          query: {
            "tag_names": args["tag_names"] ?? "",
            "release_id": args["release_id"] ?? "",
            "file_type": args["file_type"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "order_by": args["order_by"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "limit": args["limit"] ?? "",
            "offset": args["offset"] ?? "",
            "api_key": args["api_key"] ?? "",
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
        console.error(`Error executing get_fred_release_related_tags:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_release_related_tags: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
