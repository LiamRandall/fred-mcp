import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "Description": z.string().optional().describe("Get FRED tags. Optionally, filter results by tag name, tag group, or search. FRED tags are attributes assigned to series. See the related request fred/related_tags"),

    "api_key": z.string().optional().describe("Read API Keys for more information."),

    "file_type": z.string().optional().describe("A key or file extension that indicates the type of file to send."),

    "tag_names": z.string().optional().describe("A semicolon delimited list of tag names to only include in the response. See the related request fred/related_tags."),

    "exclude_tag_names": z.string().optional().describe("A semicolon delimited list of tag names that series match none of."),

    "realtime_start": z.string().optional().describe("The start of the real-time period. For more information, see Real-Time Periods."),

    "realtime_end": z.string().optional().describe("The end of the real-time period. For more information, see Real-Time Periods."),

    "limit": z.string().optional().describe("The maximum number of results to return."),

    "offset": z.string().optional().describe("non-negative integer, optional, default: 0"),

    "order_by": z.string().optional().describe("Order results by values of the specified attribute."),

    "sort_order": z.string().optional().describe("Sort results is ascending or descending order for attribute values specified by order_by."),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_tags_series",
    "GET /fred/tags/series",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/tags/series`,
          method: 'GET',
          query: {
            "order_by": args["order_by"] ?? "",
            "api_key": args["api_key"] ?? "",
            "Description": args["Description"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "limit": args["limit"] ?? "",
            "exclude_tag_names": args["exclude_tag_names"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "file_type": args["file_type"] ?? "",
            "offset": args["offset"] ?? "",
            "tag_names": args["tag_names"] ?? "",
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
        console.error(`Error executing get_fred_tags_series:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_tags_series: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
