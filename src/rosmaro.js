'use strict'

import { h, render} from 'ink'
import App from './App'

const unmount = render(<App />);

/**
|--------------------------------------------------
| its for now!!!
| usually use process.exit() instead
| add a rosmaro leaf with this functionality
|--------------------------------------------------
*/
setTimeout(() => unmount(), 5000)