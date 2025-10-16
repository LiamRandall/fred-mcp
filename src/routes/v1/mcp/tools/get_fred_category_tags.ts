import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "api_key": z.string(),

    "file_type": z.string().optional(),

    "category_id": z.string(),

    "realtime_start": z.string().optional(),

    "realtime_end": z.string().optional(),

    "limit": z.string().optional(),

    "offset": z.string().optional(),

    "order_by": z.string().optional(),

    "sort_order": z.string().optional(),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_category_tags",
    "GET /fred/category/tags",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/category/tags`,
          method: 'GET',
          query: {
            "file_type": args["file_type"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "category_id": args["category_id"] ?? "",
            "order_by": args["order_by"] ?? "",
            "api_key": args["api_key"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "limit": args["limit"] ?? "",
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
        console.error(`Error executing get_fred_category_tags:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_category_tags: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
