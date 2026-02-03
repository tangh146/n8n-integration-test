import {
  IExecuteFunctions,
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class GaaSMCPRegistry implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'GaaS MCP Registry',
    name: 'GaaSMCPRegistry',
    usableAsTool: true,
    icon: 'file:GaaSMCPRegistry.png',
    group: ['transform'],
    version: 1,
    description: '',
    defaults: {
      name: 'GaaS MCP Registry',
    },
    inputs: ['main'],
    outputs: ['main'],
    // Optional node-level hint/doc link
    documentationUrl: 'https://ntg2pcryxi.ap-southeast-1.awsapprunner.com/mcps',

    // Properties: first property is a non-editable notice (signboard)
    properties: [
      {
        displayName: 'Choose MCP server',
        name: 'mcpServer',
        type: 'options',
        options: [
          {
            name: 'Image Analyzer',
            value: 'imageAnalyzer',
            description:
              'Analyzes an image using AI and returns a detailed description.',
          },
          {
            name: 'SQL Query Assistant',
            value: 'sqlQueryAssistant',
            description:
              'Translates natural language requests into executable SQL queries to fetch ad-hoc data.',
          },
          {
            name: 'RAG & Memory',
            value: 'ragMemory',
            description:
              'Semantically retrieve data from Knowledge Bases for RAG, memory, and other purposes',
          },
          {
            name: 'Object Detector',
            value: 'objectDetector',
            description:
              'Detects objects in an image using AI vision models and generates annotated images with bounding boxes.',
          },
        ],
        default: 'imageAnalyzer',
        description:
          'Pick the mocked MCP server you want to reference. For real servers and schemas see the GaaS MCP Registry link above.',
      },
	  {
        displayName: 'For details about the MCP servers, their tools and schemas, visit the <a href="https://ntg2pcryxi.ap-southeast-1.awsapprunner.com/mcps" target="_blank">GaaS Developer Portal</a>.',
        name: 'registryInfo',
        type: 'notice',
        default: ''
      },
    ],
  };

  // Simple execute: return the chosen server value and its description.
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: IDataObject[] = [];

    // read the selected option (for the first item)
    const selected = this.getNodeParameter('mcpServer', 0) as string;

    const servers: Record<string, { label: string; description: string }> = {
      imageAnalyzer: {
        label: 'Image Analyzer',
        description:
          'Analyzes an image using AI and returns a detailed description.',
      },
      sqlQueryAssistant: {
        label: 'SQL Query Assistant',
        description:
          'Translates natural language requests into executable SQL queries to fetch ad-hoc data.',
      },
      ragMemory: {
        label: 'RAG & Memory',
        description:
          'Semantically retrieve data from Knowledge Bases for RAG, memory, and other purposes',
      },
      objectDetector: {
        label: 'Object Detector',
        description:
          'Detects objects in an image using AI vision models and generates annotated images with bounding boxes.',
      },
    };

    const chosen = servers[selected] ?? { label: selected, description: '' };

    const count = items.length ? items.length : 1;
    for (let i = 0; i < count; i++) {
      returnData.push({
        selectedValue: selected,
        selectedLabel: chosen.label,
        selectedDescription: chosen.description,
        registry: 'https://ntg2pcryxi.ap-southeast-1.awsapprunner.com/mcps',
      });
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}
