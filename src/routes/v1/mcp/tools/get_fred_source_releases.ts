import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "The": z.string().optional().describe("#Description"),

    "Description": z.string().optional().describe("Get all sources of economic data."),

    "api_key": z.string().optional().describe("Read API Keys for more information."),

    "file_type": z.string().optional().describe("A key or file extension that indicates the type of file to send."),

    "source_id": z.string().optional().describe("The id for a source."),

    "realtime_start": z.string().optional().describe("The start of the real-time period. For more information, see Real-Time Periods."),

    "realtime_end": z.string().optional().describe("The end of the real-time period. For more information, see Real-Time Periods."),

    "limit": z.string().optional().describe("The maximum number of results to return."),

    "offset": z.string().optional().describe("non-negative integer, optional, default: 0"),

    "order_by": z.string().optional().describe("Order results by values of the specified attribute."),

    "sort_order": z.string().optional().describe("Sort results is ascending or descending order for attribute values specified by order_by."),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_source_releases",
    "GET /fred/source/releases",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/source/releases`,
          method: 'GET',
          query: {
            "source_id": args["source_id"] ?? "",
            "The": args["The"] ?? "",
            "limit": args["limit"] ?? "",
            "api_key": args["api_key"] ?? "",
            "file_type": args["file_type"] ?? "",
            "sort_order": args["sort_order"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "Description": args["Description"] ?? "",
            "offset": args["offset"] ?? "",
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
        console.error(`Error executing get_fred_source_releases:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_source_releases: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
