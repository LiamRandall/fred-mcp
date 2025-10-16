import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "api_key": z.string(),

    "file_type": z.string().optional(),

    "realtime_start": z.string().optional(),

    "realtime_end": z.string().optional(),

    "limit": z.string().optional(),

    "offset": z.string().optional(),

    "last_updated": z.string().optional(),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_releases_dates",
    "GET /fred/releases/dates",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/releases/dates`,
          method: 'GET',
          query: {
            "limit": args["limit"] ?? "",
            "offset": args["offset"] ?? "",
            "last_updated": args["last_updated"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "api_key": args["api_key"] ?? "",
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
        console.error(`Error executing get_fred_releases_dates:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_releases_dates: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
