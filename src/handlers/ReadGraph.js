import { h } from 'ink';
import ReadGraph from '../components/ReadGraph'

export default {
    error: ({ ctx, err }) => ({ arrow: 'error', ctx: { ...ctx, err } }),
    graphFromUrl: ({ ctx, graph }) => ({ arrow: 'graph from url', ctx: { ...ctx, graph } }),
    graphFromFile: ({ ctx, graph }) => ({ arrow: 'graph from file', ctx: { ...ctx, graph } }),
    render: (props) => <ReadGraph {...props} />
}