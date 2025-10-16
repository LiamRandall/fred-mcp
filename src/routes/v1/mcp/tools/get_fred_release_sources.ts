import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "api_key": z.string(),

    "release_id": z.string(),

    "file_type": z.string().optional(),

    "realtime_start": z.string().optional(),

    "realtime_end": z.string().optional(),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_release_sources",
    "GET /fred/release/sources",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/release/sources`,
          method: 'GET',
          query: {
            "file_type": args["file_type"] ?? "",
            "realtime_end": args["realtime_end"] ?? "",
            "realtime_start": args["realtime_start"] ?? "",
            "api_key": args["api_key"] ?? "",
            "release_id": args["release_id"] ?? "",
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
        console.error(`Error executing get_fred_release_sources:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_release_sources: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
