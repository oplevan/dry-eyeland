import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from '../aws-exports';
import { getQuestion } from '../graphql/queries';
import { updateVote } from '../graphql/mutations';
import '../styles/components/poll.scss';

Amplify.configure(awsExports);

export default function Poll(props) {
  let location = useLocation();
  const [pollData, setPollData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    //get question based on page
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    const path = location.pathname.replace('/', '');
    try {
      //get question that matches the current url path
      API.graphql(
        graphqlOperation(getQuestion, {
          filter: {
            pageID: {
              eq: path,
            },
          },
        })
      ).then((questions) => {
        setPollData(questions.data.listQuestions.items[0]);
      });
    } catch (err) {
      setPollData(null);
    }
  };

  const postVote = async () => {
    //post the vote with the selected id
    try {
      API.graphql(
        graphqlOperation(updateVote, {
          input: {
            id: selectedID,
          },
        })
      ).then(() => {
        //posted vote, get the latest answer counts
        setSelectedID(null);
        setSubmitted(true);
        fetchQuestion();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderForm = () => {
    const renderOptions = pollData.answers.items.map((item) => (
      <div className='radio' key={item.id}>
        <input id={item.id} name='answer' type='radio' />
        <label htmlFor={item.id} dangerouslySetInnerHTML={{ __html: item.answerTitle }}></label>
      </div>
    ));

    return (
      <div className='question'>
        <div onChange={(event) => setSelectedID(event.target.id)} className='form'>
          {renderOptions}
        </div>
        <div onClick={postVote} className={`button${!selectedID ? ' disabled' : ''}`}>
          Submit
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const data = pollData.answers.items.map((answer, index) => {
      return {
        title: answer.answerTitle,
        value: answer.answerCount,
        color: props.pieColours[index],
      };
    });
    const keyList = data.map((key, index) => (
      <div className='key'>
        <span style={{ backgroundColor: props.pieColours[index] }} />
        <p dangerouslySetInnerHTML={{ __html: key.title }}></p>
      </div>
    ));
    return (
      <div className='results'>
        <PieChart
          className='pie-chart'
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
          labelStyle={{
            fontSize: window.innerWidth < 768 ? '12px' : '14px',
            fill: '#fff',
            fontFamily: 'BonVivantSerif',
          }}
          data={data}
          labelPosition={60}
        />

        <div className='key-list'>{keyList}</div>
      </div>
    );
  };

  if (pollData)
    return (
      <section className='container poll'>
        <h2 className={props.titleAlign}>Take our poll</h2>

        <div className='content'>
          {location.pathname === '/prevalence-point' ? (
            <img src={require('../assets/icons/question-blue.svg').default} />
          ) : (
            <img src={require('../assets/icons/question.svg').default} />
          )}

          <div className='poll'>
            <p>{pollData.questionTitle}</p>
            {submitted ? '' : <p className='select'>Select one:</p>}
            {submitted ? renderResult() : renderForm()}
          </div>
        </div>
      </section>
    );
  else
    return (
      <section className='container poll'>
        <p>Error loading poll</p>
      </section>
    );
}
