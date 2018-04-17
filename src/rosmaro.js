'use strict'

import { h, render} from 'ink'
import App from './App'

const unMount = render(<App />);

/**
|--------------------------------------------------
| its for now!!!
| add a rosmaro leaf with process.exit() functionality to exit properly
|--------------------------------------------------
*/
setTimeout(() => unMount(), 5000)