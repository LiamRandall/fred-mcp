import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "Description": z.string().optional().describe("Get the observations or data values for an economic data series."),

    "api_key": z.string().optional().describe("Read API Keys for more information."),

    "file_type": z.string().optional().describe("A key or file extension that indicates the type of file to send."),

    "series_id": z.string().optional().describe("The id for a series."),

    "realtime_start": z.string().optional().describe("The start of the real-time period. For more information, see Real-Time Periods."),

    "realtime_end": z.string().optional().describe("The end of the real-time period. For more information, see Real-Time Periods."),

    "order_by": z.string().optional().describe("Order results by values of the specified attribute."),

    "sort_order": z.string().optional().describe("Sort results is ascending or descending observation_date order."),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_series_tags",
    "GET /fred/series/tags",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/series/tags`,
          method: 'GET',
          query: {
            "sort_order": args["sort_order"] ?? "",
            "order_by": args["order_by"] ?? "",
            "Description": args["Description"] ?? "",
            "api_key": args["api_key"] ?? "",
            "series_id": args["series_id"] ?? "",
            "file_type": args["file_type"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
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
        console.error(`Error executing get_fred_series_tags:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_series_tags: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
