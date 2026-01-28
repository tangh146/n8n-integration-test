import {
    IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class GaaSMCPRegister implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GaaS MCP Register',
		name: 'GaaSMCPRegister',
		// Make this node usable as an AI Tool / agent tool
		// (community pattern used by many nodes and examples)
		usableAsTool: true,

		icon: 'file:GaaSMCPRegister.png', // replace with a real icon file in your package
		group: ['transform'],
		version: 1,
		description: 'Proof-of-concept custom tool node with a dropdown',
		defaults: {
			name: 'GaaS MCP Register',
		},
		inputs: ['main'],
		outputs: ['main'],
		// Node parameters show up in the editor UI.
		properties: [
			{
				displayName: 'Choose action',
				name: 'choice',
				type: 'options',           // dropdown
				options: [
					{
						name: 'Alpha',
						value: 'alpha',
						description: 'Pick Alpha action',
					},
					{
						name: 'Bravo',
						value: 'bravo',
						description: 'Pick Bravo action',
					},
				],
				default: 'alpha',
				description: 'A simple dropdown choice for this PoC node',
			},
			// Example of an additional text field (optional)
			{
				displayName: 'Extra message',
				name: 'message',
				type: 'string',
				default: '',
				placeholder: 'Optional text shown in output',
				description: 'Optional message to return with the chosen option',
			},
		],
	};

	/**
	 * Simple execute: read the parameters and return them as JSON
	 * so you can test and see the dropdown value in the output.
	 */
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData(); // typical pattern, we ignore input content for PoC
		// We'll produce a single output item for each input (or one if none)
		const returnData: IDataObject[] = [];

		// If the node is used as a tool by an agent, it might be invoked differently,
		// but returning structured JSON is a safe PoC behaviour.
		const choice = this.getNodeParameter('choice', 0, '') as string;
		const message = this.getNodeParameter('message', 0, '') as string;

		// If multiple input items, echo result for each (safe behavior)
		const count = items.length ? items.length : 1;
		for (let i = 0; i < count; i++) {
			returnData.push({
				chosen: choice,
				message,
				info: `This is a PoC — you selected "${choice}"`,
			});
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
