import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class GaaSLLMHub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GaaS LLM Hub',
		name: 'GaaSLLMHub',
		icon: 'file:GaaS.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["model"]}}',
		description: 'Select models from the GaaS Model Garden',
		defaults: {
			name: 'GaaS LLM Hub',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				options: [
					{
						name: 'GPT-4 Turbo',
						value: 'gpt-4-turbo',
					},
					{
						name: 'Claude 3.5 Sonnet',
						value: 'claude-3.5-sonnet',
					},
					{
						name: 'Claude 3 Opus',
						value: 'claude-3-opus',
					},
					{
						name: 'Gemini 1.5 Pro',
						value: 'gemini-1.5-pro',
					},
					{
						name: 'Llama 3 70B',
						value: 'llama-3-70b',
					},
				],
				default: 'claude-3.5-sonnet',
				description: 'The LLM model to use',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const model = this.getNodeParameter('model', i) as string;

			returnData.push({
				json: {
					model,
					status: 'configured',
					message: `GaaS LLM Hub ready with ${model}`,
				},
				pairedItem: i,
			});
		}

		return [returnData];
	}
}