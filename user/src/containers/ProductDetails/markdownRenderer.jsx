import { Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'

const MarkdownRenderer = ({ markdown }) => {
    return (
        <Box>
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMdx]}>
                {markdown}
            </ReactMarkdown>
        </Box>
    )
}

export default MarkdownRenderer
