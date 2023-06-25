import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('')
//   const [exercises, setExercises] = useState([])
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
     const fetchExercisesData = async () => {
        const bodyPartsData = await fetchData(
            'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
            exerciseOptions
        );
        console.log("BodyPartsData");
        console.log(bodyPartsData);

        setBodyParts(['all', ...bodyPartsData]);
     }

     fetchExercisesData();
  }, [])
  

  const handleSearch = async () => {
    if(search) {
        const exercisesData = await fetchData(
            'https://exercisedb.p.rapidapi.com/exercises',
            exerciseOptions
        );

        // console.log(exercisesData)

        const searchedExercises = exercisesData.filter(
            (exercise) => exercise.name.toLowerCase().includes(search)
            || exercise.bodyPart.toLowerCase().includes(search)
            || exercise.equipment.toLowerCase().includes(search)
            || exercise.target.toLowerCase().includes(search)
        );
        console.log(search);
        console.log(searchedExercises);
        setSearch('');
        setExercises(searchedExercises);
        // console.log(exercises);
        if(searchedExercises.length > 0)
            // window.scrollTo({top: 1800, behavior: 'smooth'});
            document.getElementById('exercises').scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <Stack alignItems="center" mt="37px"
    justifyContent="center" p="20px">
        <Typography fontWeight={700} sx={{
            fontSize: { lg: '44px', xs: '30px' }
        }}
        mb="50px"
        textAlign="center">
            Awesome Exercises You <br />
            Should Know
        </Typography>
        <Box position="relative" mb="72px" height="100px">
            <TextField
                sx={{
                    input: {
                        fontWeight: '700',
                        border: 'none',
                        borderRadius: '4px'
                    },
                    width: { lg: '800px', xs: '350px' },
                    backgroundColor: '#fff',
                    borderRadius: '40px'
                }}
                height="76px"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                placeholder="Search for Exercises"
                type="text"
            />
            <Button className="search-btn"
                sx={{
                    bgcolor: '#FF2625',
                    color: '#fff',
                    textTransform: 'none',
                    width: { lg: '175px', xs: '80px' },
                    fontSize: { lg: '20px', xs: '14px' },
                    height: '56px',
                    position: 'absolute',
                    right: '0'
                }}
                onClick={handleSearch}
            >
                Search
            </Button>
        </Box>
        <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
            <HorizontalScrollbar 
                data={bodyParts} 
                bodyPart={bodyPart} 
                setBodyPart={setBodyPart}
                isbodyParts={true}
            />
        </Box>    
    </Stack>
  )
}

export default SearchExercises