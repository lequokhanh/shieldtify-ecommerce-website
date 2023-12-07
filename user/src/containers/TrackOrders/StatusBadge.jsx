import { Box } from '@chakra-ui/react'
const StatusBadge = ({ status }) => {
    const statusColor = {
        Initiated: {
            bgColor: '#F3F4F6',
            color: '#323743',
        },
        Processing: {
            bgColor: '#FEF9EE',
            color: '#98690C',
        },
        Succeed: {
            bgColor: '#EEFDF3',
            color: '#117B34',
        },
        Canceled: {
            bgColor: '#FDF2F2',
            color: '#DE3B40',
        },
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={'30px'}
            bgColor={statusColor[status].bgColor}
            color={statusColor[status].color}
            padding={'10px 20px'}
            fontWeight={'500'}
            fontSize={'12px'}
        >
            {status}
        </Box>
    )
}

export default StatusBadge
