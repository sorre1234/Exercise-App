import React, { useEffect, useState } from 'react';
import { Pagination, Box, Stack, Typography } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

import { exerciseOptions, fetchData } from '../utils/fetchData';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise, indexOfLastExercise
  );

  const paginate = (e, value) => {
    setCurrentPage(value);

    document.getElementById('exercises').scrollIntoView({behavior: 'smooth'});
  }

  useEffect(() => {
    const fetchExercises = async () => {
      let uri = '';
      if(bodyPart === 'all') uri = 'https://exercisedb.p.rapidapi.com/exercises';
      else uri = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;

      const exercisesData = await fetchData(
        uri,
        exerciseOptions
      )

      setExercises(exercisesData);
    }

    fetchExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyPart])

  useEffect(() => {
    setCurrentPage(1);
  }, [exercises])
  
  return (
    <Box
      id="exercises"
      sx={{mt: {lg: '110px'}}}
      mt="50px"
      p="20px"
    >
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      {
        exercises.length ?
      (<div>
        <Stack
          direction="row"
          sx={{ gap: { lg: '110px', xs: '50px' } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {
            currentExercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))
          }
        </Stack>
        <Stack mt="100px" alignItems="center">
          {
            exercises.length > exercisesPerPage && (
              <Pagination 
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            )
          }
        </Stack>
      </div>)
      : <Loader />}
    </Box>
  )
}

export default Exercises