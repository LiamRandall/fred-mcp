import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "Description": z.string().optional().describe("Get all sources of economic data."),

    "api_key": z.string().optional().describe("Read API Keys for more information."),

    "file_type": z.string().optional().describe("A key or file extension that indicates the type of file to send."),

    "source_id": z.string().optional().describe("The id for a source."),

    "realtime_start": z.string().optional().describe("The start of the real-time period. For more information, see Real-Time Periods."),

    "realtime_end": z.string().optional().describe("The end of the real-time period. For more information, see Real-Time Periods."),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_source",
    "GET /fred/source",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/source`,
          method: 'GET',
          query: {
            "source_id": args["source_id"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "api_key": args["api_key"] ?? "",
            "Description": args["Description"] ?? "",
            "file_type": args["file_type"] ?? "",
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
        console.error(`Error executing get_fred_source:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_source: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
