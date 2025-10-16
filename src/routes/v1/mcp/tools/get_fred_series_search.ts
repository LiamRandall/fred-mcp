import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "Description": z.string().optional().describe("Get the observations or data values for an economic data series."),

    "api_key": z.string().optional().describe("Read API Keys for more information."),

    "file_type": z.string().optional().describe("A key or file extension that indicates the type of file to send."),

    "search_text": z.string().optional().describe("The words to match against economic data series."),

    "search_type": z.string().optional().describe("Determines the type of search to perform."),

    "realtime_start": z.string().optional().describe("The start of the real-time period. For more information, see Real-Time Periods."),

    "realtime_end": z.string().optional().describe("The end of the real-time period. For more information, see Real-Time Periods."),

    "limit": z.string().optional().describe("The maximum number of results to return."),

    "offset": z.string().optional().describe("non-negative integer, optional, default: 0"),

    "order_by": z.string().optional().describe("Order results by values of the specified attribute."),

    "sort_order": z.string().optional().describe("Sort results is ascending or descending observation_date order."),

    "filter_variable": z.string().optional().describe("The attribute to filter results by."),

    "filter_value": z.string().optional().describe("The value of the filter_variable attribute to filter results by."),

    "tag_names": z.string().optional().describe("A semicolon delimited list of tag names that series match all of."),

    "exclude_tag_names": z.string().optional().describe("A semicolon delimited list of tag names that series match none of."),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_series_search",
    "GET /fred/series/search",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/series/search`,
          method: 'GET',
          query: {
            "limit": args["limit"] ?? "",
            "Description": args["Description"] ?? "",
            "api_key": args["api_key"] ?? "",
            "file_type": args["file_type"] ?? "",
            "offset": args["offset"] ?? "",
            "filter_variable": args["filter_variable"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "search_text": args["search_text"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "exclude_tag_names": args["exclude_tag_names"] ?? "",
            "filter_value": args["filter_value"] ?? "",
            "tag_names": args["tag_names"] ?? "",
            "order_by": args["order_by"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "search_type": args["search_type"] ?? "",
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
        console.error(`Error executing get_fred_series_search:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_series_search: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
