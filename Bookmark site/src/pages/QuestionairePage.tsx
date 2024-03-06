import { Stack, Text } from '@mantine/core';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Title from '../components/Title/Titles';
import { IQuestion, IChoice, IBodyContent, ISolution } from '../types/api_types';
import searchQuestionsChoicesFromJson from '../utils/TempGetNextQuestion';
import { bodyContentUseStyles } from '../components/MainBody/HelperFunctions/BodyContentStyle';
import ToggleButton from '../components/MainBody/TogglebButton';
import SolutionPages from '../utils/SolutionContent';
import BookmarkButton from '../components/Bookmark/BookmarkButton';
import axios from 'axios';

interface BookmarkItem {
  id: number;
  attributes: {
    Title: string;
    identifier: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface Props {}

const QuestionaireBodyContent: React.FC<Props> = () => {
  const { classes } = bodyContentUseStyles();


  // current question state
  const [currQuestion, setCurrQuestion] = useState<IQuestion>({ id: '2', title: 'Where you lefted off' });

  // current choices state
  const [currChoices, setCurrChoices] = useState<IChoice[]>([]);

  // currently clicked choice state
  const [clickedChoice, setClickedChoice] = useState<IChoice>({ id: '1', title: 'Home' });

  // solution state
  const [solution, setSolution] = useState<ISolution>({ id: '', title: '' });

  //set User ID
  const [userId, setUserId] = useState(null);

  // whether solution has been found
  const [hasSolution, setHasSolution] = useState(false);

  // page title ref
  const pageTitle = useRef('Home');

  // image ref
  const image = useRef('/titleimghome.PNG');

  // previously selected content ref
  const prevSelectedContent = useRef<IBodyContent[]>([]);


  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const response = await axios.get('http://localhost:1338/api/bookmarks');
        const bookmarkData = response.data.data; // Adjust if your response structure is different
  
        const formattedChoices = bookmarkData.map((item: BookmarkItem) => ({
          id: item.attributes.identifier.toString(), // Converting id to string if necessary
          title: item.attributes.Title,
          link: `/path-for-${item.attributes.identifier}`, // Adjust the link format as needed
        }));
  
        setCurrChoices(formattedChoices);
      } catch (error) {
        console.error('Error fetching choices:', error);
      }
    };
  
    fetchChoices();
  }, []);


  // memoized search function for questions and choices
  const memoizedSearchQuestionsChoicesFromJson = useMemo(() => {
    return async (choice: IChoice): Promise<[IQuestion, IChoice[], boolean, ISolution]> => {
      return await searchQuestionsChoicesFromJson(choice);
    };
  }, []);

  const updateChoicesAndQuestions = useCallback(async (choice: IChoice) => {
    console.log('Clicked choice:', choice);
    try {
      // Fetch solution details using the identifier from the clicked choice
      const response = await axios.get(`http://localhost:1338/api/solutions/${choice.id}`);
      const solutionDetails = response.data.data; // Adjust based on response structure
  
      // Assuming that hasSol is determined from the response or some logic
      const hasSol = solutionDetails ? true : false;
  
      if (hasSol) {
        console.log('Solution found, updating state...');
        setSolution({
          id: solutionDetails.id.toString(),
          title: solutionDetails.attributes.Title,
          // Add other fields as necessary from solutionDetails
        });
        setHasSolution(true);
      } else {
        console.log('No solution, updating choices...');
        setSolution({ id: '', title: '' });
        setHasSolution(false);
      }
  
      // Add additional logic as needed, for example, updating the current question
      // based on the response or other criteria
  
    } catch (error) {
      console.error('Error fetching solution details:', error);
      // Handle error here
    }
  }, []);

  // useEffect for fetching user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:1338/api/users');
        // Assuming you want to use the first user in the list
        const firstUser = response.data[0];
        setUserId(firstUser.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  /**
   * Goes to the previous selected question and choices, and updates the current state with previous state
   *///the way we fetch fprevious question was fixed during dev by using reroute
  const prevQuestion = useCallback(() => {
    if (prevSelectedContent.current.length > 1) {
      const i = 1;

    // if current question has solution
    if (hasSolution) {
      setHasSolution(false)
      return
    }

      // update current state with previous state
      setCurrQuestion(prevSelectedContent.current[prevSelectedContent.current.length-i].question);
      setClickedChoice(prevSelectedContent.current[prevSelectedContent.current.length-i].prevChoice)
      setCurrChoices(prevSelectedContent.current[prevSelectedContent.current.length-i].choiceList)
      
      // remove previous state from the list
      prevSelectedContent.current.pop()

      // set page title and image to default if previous state is not available
      if (prevSelectedContent.current.length < 2){
        pageTitle.current ="Home"
        image.current = "/titleimghome.PNG"
      }

    }
  }, [prevSelectedContent, hasSolution, updateChoicesAndQuestions, clickedChoice]);

  return (
    <div>
      <Title 
        hasPrev={(prevSelectedContent.current.length > 1)} 
        prevQuestion={prevQuestion} 
        titleImg={image.current} 
        title={pageTitle.current} 
      />
  
      {!hasSolution ? (
        <Stack
          spacing="xl"
          className={classes.outer}
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          })}
        >
          <Text className={classes.text}> {currQuestion.title} </Text>
          <Text className={classes.descriptionText}> {currQuestion.description} </Text>
          {currChoices.map((choice) => (
            <div key={choice.id}>
              <ToggleButton 
                updateContent={() => updateChoicesAndQuestions(choice)} 
                className={classes.inner} 
                choice={choice} 
              />
            </div>
          ))}
        </Stack>
      ) : (
        <SolutionPages solution={solution} hasSolution={hasSolution} />
      )}
  
      {/* Conditional rendering for BookmarkButton */}
      {hasSolution && (
        <BookmarkButton 
          pageTitle={solution.title} 
          pageIdentifier={solution.id} // Assuming solution.id is your unique page identifier
          userId={userId} // Replace this with actual logic to obtain the userId
          isSolutionPage={hasSolution}
        />
      )}
    </div>
  );
  
};

export default QuestionaireBodyContent