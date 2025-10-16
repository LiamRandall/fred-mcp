import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "Description": z.string().optional().describe("Get FRED tags. Optionally, filter results by tag name, tag group, or search. FRED tags are attributes assigned to series. See the related request fred/related_tags"),

    "api_key": z.string().optional().describe("Read API Keys for more information."),

    "file_type": z.string().optional().describe("A key or file extension that indicates the type of file to send."),

    "realtime_start": z.string().optional().describe("The start of the real-time period. For more information, see Real-Time Periods."),

    "realtime_end": z.string().optional().describe("The end of the real-time period. For more information, see Real-Time Periods."),

    "tag_names": z.string().optional().describe("A semicolon delimited list of tag names to only include in the response. See the related request fred/related_tags."),

    "tag_group_id": z.string().optional().describe("A tag group id to filter tags by type."),

    "search_text": z.string().optional().describe("The words to find matching tags with."),

    "limit": z.string().optional().describe("The maximum number of results to return."),

    "offset": z.string().optional().describe("non-negative integer, optional, default: 0"),

    "order_by": z.string().optional().describe("Order results by values of the specified attribute."),

    "sort_order": z.string().optional().describe("Sort results is ascending or descending order for attribute values specified by order_by."),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_related_tags",
    "GET /fred/related_tags",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/related_tags`,
          method: 'GET',
          query: {
            "limit": args["limit"] ?? "",
            "Description": args["Description"] ?? "",
            "offset": args["offset"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "tag_group_id": args["tag_group_id"] ?? "",
            "order_by": args["order_by"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "api_key": args["api_key"] ?? "",
            "tag_names": args["tag_names"] ?? "",
            "file_type": args["file_type"] ?? "",
            "search_text": args["search_text"] ?? "",
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
        console.error(`Error executing get_fred_related_tags:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_related_tags: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
