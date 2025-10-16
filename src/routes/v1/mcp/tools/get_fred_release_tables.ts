import z from "zod";
import { McpServer as UpstreamMCPServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { httpClient } from "../../../../http_client.js";
export function setupTool<S extends UpstreamMCPServer>(server: S) {
  const params = {
    "api_key": z.string(),

    "release_id": z.string(),

    "file_type": z.string().optional(),

    "element_id": z.string().optional(),

    "include_observations": z.string().optional(),

    "observation_date": z.string().optional(),

  };
  type ParamsType = z.infer<z.ZodObject<typeof params>>;
  server.tool(
    "get_fred_release_tables",
    "GET /fred/release/tables",
    params,
    async (args: ParamsType): Promise<CallToolResult> => {
      try {
        const response = await httpClient.call({
          path: `/fred/release/tables`,
          method: 'GET',
          query: {
            "api_key": args["api_key"] ?? "",
            "element_id": args["element_id"] ?? "",
            "file_type": args["file_type"] ?? "",
            "observation_date": args["observation_date"] ?? "",
            "include_observations": args["include_observations"] ?? "",
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
        console.error(`Error executing get_fred_release_tables:`, error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing get_fred_release_tables: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
