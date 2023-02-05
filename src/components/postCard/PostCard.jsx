import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import UserComment from '../userComment/UserComment'

/* eslint-disable react/jsx-props-no-spreading */

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return (
        <>
            {' '}
            <Typography variant="body2" color="text.secondary">
                Comments
            </Typography>
            {' '}
            <IconButton {...other} />
        </>
    )
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

function PostCard(props) {
    const { post } = props

    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Card sx={{ maxWidth: 600, mb: 3 }}>
            <CardHeader
                subheader={post.date}
            />
            <CardMedia
                component="img"
                height="194"
                image={post.image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ ml: 1.2 }}>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ pt: 0 }}>
                    {post.comments.map((comment, index) => (
                        <div style={{ marginBottom: `${index < post.comments.length - 1 ? '15px' : '0px'}` }}>
                            <UserComment key={comment.commentator_id} comment={comment} />
                        </div>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default PostCard
