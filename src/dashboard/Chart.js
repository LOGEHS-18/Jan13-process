import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { txtDB } from '../config';

const FeedbackAnalysisChart = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const feedbackCollection = collection(txtDB, 'entries');
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackEntries = feedbackSnapshot.docs.map((doc) => doc.data());
      setFeedbackData(feedbackEntries);
    };

    fetchDataFromFirestore();
  }, []);

  const analyzeFeedbackData = () => {
    let excellentCount = 0;
    let fairCount = 0;
    let goodCount = 0;
    let badCount = 0;

    feedbackData.forEach((entry) => {
      // Assuming each entry has a property named 'feedbackCategory'
      const category = entry.feedbackCategory;

      // Categorize feedback based on 'feedbackCategory'
      switch (category) {
        case 'Excellent':
          excellentCount++;
          break;
        case 'Good':
          goodCount++;
          break;
        case 'Fair':
          fairCount++;
          break;
        case 'Bad':
          badCount++;
          break;
        default:
          // Handle other cases or undefined values
          break;
      }
    });

    const totalResponses = goodCount + badCount + excellentCount + fairCount;

    const percentages = {
      Excellent: ((excellentCount / totalResponses) * 100).toFixed(2),
      Good: ((goodCount / totalResponses) * 100).toFixed(2),
      Fair: ((fairCount / totalResponses) * 100).toFixed(2),
      Bad: ((badCount / totalResponses) * 100).toFixed(2),
    };

    return percentages;
  };

  const percentages = analyzeFeedbackData();

  const data = {
    labels: Object.keys(percentages),
    datasets: [
      {
        data: Object.values(percentages),
        backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#4CAF50', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h2>Feedback Analysis Chart</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default FeedbackAnalysisChart;
