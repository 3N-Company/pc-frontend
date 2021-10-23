import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import React from 'react'
import Slide from '@mui/material/Slide'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const Transition = React.forwardRef(function Transition (props, ref) {
	return <Slide direction="up" ref={ ref } { ...props } />
})

const FullscreenPhoto = ({ isOpened, photoId, photoMeta, handleClose, requestNextPhoto }) => {

	const [photoType, setCurrentPhotoType] = React.useState("original");
	const photoTypeToUrl = {
		"original": `http://localhost:8080/photo/${photoId}`,
		"colorized": `http://localhost:8080/photo/${photoId}/colorized`,
		"upscaled": `http://localhost:8080/photo/${photoId}/upscaled`,
	}

	return (
		<Dialog
			fullScreen
			sx={ { background: '#000' } }
			open={ isOpened }
			onClose={ handleClose }
			TransitionComponent={ Transition }
		>
			<AppBar sx={ { position: 'relative', backgroundColor: '#212121' } }>
				<Toolbar>
					<Typography sx={ { ml: 2, flex: 1 } } variant="h6" component="div">
						Fullscreen mode
					</Typography>


					<Button
						autoFocus
						variant="outlined"
						color={ photoType === "original" ? 'success' : 'inherit' }
						onClick={ () => setCurrentPhotoType("original") }
						sx={ { mr: '10px' } }
						startIcon={ <InsertPhotoOutlinedIcon/> }
					>
						Original
					</Button>
					<Button
						autoFocus
						variant="outlined"
						color={ photoType === "upscaled" ? 'success' : 'inherit' }
						onClick={ () => setCurrentPhotoType("upscaled") }
						sx={ { mr: '10px' } }
						startIcon={ <BlurOnOutlinedIcon/> }
					>
						upscale
					</Button>
					<Button
						autoFocus
						variant="outlined"
						color={ photoType === "colorized" ? 'success' : 'inherit' }
						onClick={ () => setCurrentPhotoType("colorized") }
						sx={ { mr: '10px' } }
						startIcon={ <AutoAwesomeOutlinedIcon/> }
					>
						colorize
					</Button>
					{ requestNextPhoto === undefined ? ''
						: <Button
							autoFocus
							variant="outlined"
							color="inherit"
							onClick={ requestNextPhoto }
							sx={ { mr: '20px' } }
							startIcon={ <RotateRightOutlinedIcon/> }
						>
							next one
						</Button>
					}
					<IconButton
						edge="start"
						color="inherit"
						onClick={ handleClose }
						aria-label="close"
					>
						<CloseIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				sx={ {
					height: '100%',
					maxHeight: '94vh',
					background: '#000',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				} }
			>
				<img
					className={ 'contribute fullscreen' }
					src={ photoTypeToUrl[photoType] }
					alt=""
				/>
			</Box>
		</Dialog>
	)
}

export default FullscreenPhoto