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

    "limit": z.string().optional().describe("The maximum number of results to return."),

    "offset": z.string().optional().describe("non-negative integer, optional, default: 0"),

    "sort_order": z.string().optional().describe("Sort results is ascending or descending observation_date order."),

    "observation_start": z.string().optional().describe("The start of the observation period."),

    "observation_end": z.string().optional().describe("The end of the observation period."),

    "units": z.string().optional().describe("A key that indicates a data value transformation."),

    "frequency": z.string().optional().describe("Optional parameter to aggregate higher frequency data to lower frequency (average, sum, end of period)."),

    "aggregation_method": z.string().optional().describe("Aggregation method used for frequency aggregation. Ignored if frequency is not set."),

    "output_type": z.string().optional().describe("An integer that indicates an output type."),

    "vintage_dates": z.string().optional().describe("Download data as it existed on specified vintage dates instead of a real-time period."),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_series_observations",
    "GET /fred/series/observations",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/series/observations`,
          method: 'GET',
          query: {
            "sort_order": args["sort_order"] ?? "",
            "output_type": args["output_type"] ?? "",
            "observation_start": args["observation_start"] ?? "",
            "units": args["units"] ?? "",
            "frequency": args["frequency"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "observation_end": args["observation_end"] ?? "",
            "series_id": args["series_id"] ?? "",
            "Description": args["Description"] ?? "",
            "aggregation_method": args["aggregation_method"] ?? "",
            "offset": args["offset"] ?? "",
            "api_key": args["api_key"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "vintage_dates": args["vintage_dates"] ?? "",
            "file_type": args["file_type"] ?? "",
            "limit": args["limit"] ?? "",
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
        console.error(`Error executing get_fred_series_observations:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_series_observations: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
