import RentEase from "../RentEase/RentEase"
import {Grid, Skeleton, Container} from "@mui/material"
import { useContext, useState } from "react"
import DataContext from "../../context/DataContext"
import PaginationNum from "../paginationNum/PaginationNum"

const List = ({rentals}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  // console.log('rentals in list', rentals)
  
  return (
    <>
      {!rentals?.length ? (
        <Container maxWidth="lg">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "30px",
            }}
          >
            <div>
              <Skeleton
                variant="rectangular"
                width={250}
                height={100}
                style={{ marginBottom: "10px", borderRadius: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={250}
                height={300}
                style={{ marginBottom: "50px", borderRadius: "15px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="rectangular"
                width={250}
                height={100}
                style={{ marginBottom: "10px", borderRadius: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={250}
                height={300}
                style={{ marginBottom: "50px", borderRadius: "15px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="rectangular"
                width={250}
                height={100}
                style={{ marginBottom: "10px", borderRadius: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={250}
                height={300}
                style={{ marginBottom: "50px", borderRadius: "15px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="rectangular"
                width={250}
                height={100}
                style={{ marginBottom: "10px", borderRadius: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={250}
                height={300}
                style={{ marginBottom: "50px", borderRadius: "15px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="rectangular"
                width={250}
                height={100}
                style={{ marginBottom: "10px", borderRadius: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={250}
                height={300}
                style={{ marginBottom: "50px", borderRadius: "15px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="rectangular"
                width={250}
                height={100}
                style={{ marginBottom: "10px", borderRadius: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={250}
                height={300}
                style={{ marginBottom: "50px", borderRadius: "15px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="rectangular"
                width={250}
                height={100}
                style={{ marginBottom: "10px", borderRadius: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={250}
                height={300}
                style={{ marginBottom: "50px", borderRadius: "15px" }}
              />
            </div>
            <div>
              <Skeleton
                variant="rectangular"
                width={250}
                height={100}
                style={{ marginBottom: "10px", borderRadius: "10px" }}
              />
              <Skeleton
                variant="rectangular"
                width={250}
                height={300}
                style={{ marginBottom: "50px", borderRadius: "15px" }}
              />
            </div>
          </div>
        </Container>
      ) : (
        <Container maxWidth={"lg"}>
          <Grid container spacing={3} padding={"10px"}>
            {rentals?.slice(firstPostIndex, lastPostIndex).map((rental, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <RentEase rental={rental} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <PaginationNum
          totalPost={rentals?.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default List