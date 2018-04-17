import { h, Text } from 'ink'
import TextAnimation from 'ink-text-animation'


export default ({ name = "glitch" }) => (
    <div>
        <TextAnimation name={name} >
            <Text>
                <div>  _ __ ___  ___ _ __ ___   __ _ _ __ ___ </div>
                <div> | '__/ _ \/ __| '_ ` _ \ / _` | '__/ _ \ </div>
                <div> | | | (_) \__ \ | | | | | (_| | | | (_) |</div>
                <div> |_|  \___/|___/_| |_| |_|\__,_|_|  \___/ </div>
            </Text>
        </TextAnimation>
    </div>
)