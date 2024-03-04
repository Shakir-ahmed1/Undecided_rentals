import {Container, Box} from "@mui/material"

const Message = () => {
  return (
    <div style={{minHeight:'100vh'}}>
      <Container maxWidth="lg">
        <Box display={'flex'} justifyContent={"center"}>
         <h1>Messages</h1>
       </Box>
      </Container>
    </div>
  )
}

export default Message