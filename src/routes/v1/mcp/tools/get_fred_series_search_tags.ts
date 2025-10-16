import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "Description": z.string().optional().describe("Get the observations or data values for an economic data series."),

    "api_key": z.string().optional().describe("Read API Keys for more information."),

    "file_type": z.string().optional().describe("A key or file extension that indicates the type of file to send."),

    "series_search_text": z.string().optional().describe("The words to match against economic data series."),

    "realtime_start": z.string().optional().describe("The start of the real-time period. For more information, see Real-Time Periods."),

    "realtime_end": z.string().optional().describe("The end of the real-time period. For more information, see Real-Time Periods."),

    "tag_names": z.string().optional().describe("A semicolon delimited list of tag names that series match all of."),

    "tag_group_id": z.string().optional().describe("A tag group id to filter tags by type."),

    "tag_search_text": z.string().optional().describe("The words to find matching tags with."),

    "limit": z.string().optional().describe("The maximum number of results to return."),

    "offset": z.string().optional().describe("non-negative integer, optional, default: 0"),

    "order_by": z.string().optional().describe("Order results by values of the specified attribute."),

    "sort_order": z.string().optional().describe("Sort results is ascending or descending observation_date order."),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_series_search_tags",
    "GET /fred/series/search/tags",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/series/search/tags`,
          method: 'GET',
          query: {
            "tag_search_text": args["tag_search_text"] ?? "",
            "file_type": args["file_type"] ?? "",
            "series_search_text": args["series_search_text"] ?? "",
            "offset": args["offset"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "Description": args["Description"] ?? "",
            "tag_names": args["tag_names"] ?? "",
            "limit": args["limit"] ?? "",
            "order_by": args["order_by"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "tag_group_id": args["tag_group_id"] ?? "",
            "api_key": args["api_key"] ?? "",
            "sort_order": args["sort_order"] ?? "",
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
        console.error(`Error executing get_fred_series_search_tags:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_series_search_tags: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
