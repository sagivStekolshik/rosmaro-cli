import { h } from 'ink'

export default {

    afterRender: ({ res }) => {
        
        return (
            <div>
                {res.BigText}
                {res.UpdateApp}
            </div>
        )
    }
}