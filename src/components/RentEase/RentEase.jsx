// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Chip,
//   Rating,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";

// const RentEase = ({ rental }) => {
//   return (
//     <Card elevation={6}>
//       <CardMedia
//         style={{ minHeight: "250px" }}
//         image={
//           rental.photo
//             ? rental.photo.images.large.url
//             : "https://media.istockphoto.com/id/149060607/photo/for-rent-sign-in-front-of-new-house.jpg?s=612x612&w=0&k=20&c=By627yICPZugFR1j2_a_7MCEn1f5ltYlivg6Tv50JaQ="
//         }
//         title={rental.name}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h6">{rental.name}</Typography>
//         <Box display="flex" justifyContent="space-between">
//           <Typography variant="subtitle1">Price</Typography>
//           <Typography variant="subtitle1">{rental.price_level}</Typography>
//         </Box>
//         <Box display="flex" justifyContent="space-between">
//           <Typography variant="subtitle1">Ranking</Typography>
//           <Typography variant="subtitle1">{rental.ranking}</Typography>
//         </Box>
//         {rental?.awards?.map((award) => (
//           <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
//             <img src={award.images.small} alt={award.display_name} />
//             <Typography variant="subtitle2" color="textSecondry">{award.display_name}</Typography>
//           </Box>
//         ))}
//         {rental?.cuisine?.map(({name}) => (
//           <>
//             &nbsp;<Chip key={name} size="small" label={name} style={{margin:'3px 0'}}/>&nbsp;
//           </>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

// export default RentEase;
