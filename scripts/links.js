// Object containing links for each grade
const linksByGrade = {
   6: {
      classwork: "https://sourabhsuneja.github.io/question-paper/?ed=%7B%22schoolName%22%3A%22Jamna%20Vidyapeeth%22%2C%22examName%22%3A%22Answers%20of%20Chapter%207%20%26%208%22%2C%22subject%22%3A%22Computer%22%2C%22duration%22%3A60%2C%22grade%22%3A%22VI%22%7D&qpm=%7B%22kips-6-ch-7%22%3A%7B%22Fill%20up%22%3A4%2C%22True%2FFalse%22%3A4%2C%22MCQ%22%3A4%2C%22Short%20Answer%20Type%22%3A4%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22kips-6-ch-8%22%3A%7B%22Fill%20up%22%3A4%2C%22True%2FFalse%22%3A4%2C%22MCQ%22%3A4%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%7D&qc=%7B%22headings%22%3A%5B%22Fill%20ups%20(Ch-7)%3A%22%2C%22True%2FFalse%20(Ch-7)%3A%22%2C%22MCQs%20(Ch-7)%3A%22%2C%22Question%20Answers%20(Ch-7)%3A%22%2C%22Fill%20ups%20(Ch-8)%3A%22%2C%22True%2FFalse%20(Ch-8)%3A%22%2C%22MCQs%20(Ch-8)%3A%22%2C%22Question%20Answers%20(Ch-8)%3A%22%5D%2C%22qTypes%22%3A%5B%7B%22Fill%20up%22%3A4%7D%2C%7B%22True%2FFalse%22%3A4%7D%2C%7B%22MCQ%22%3A4%7D%2C%7B%22Short%20Answer%20Type%22%3A4%7D%2C%7B%22Fill%20up%22%3A4%7D%2C%7B%22True%2FFalse%22%3A4%7D%2C%7B%22MCQ%22%3A4%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%5D%2C%22weightPerQ%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22mustInclude%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22settings%22%3A%7B%22provideAnsOrSpace%22%3A%22ans%22%2C%22randomiseSelection%22%3Afalse%2C%22strictChapterWiseDistribution%22%3Afalse%2C%22editable%22%3Afalse%2C%22showAIBtns%22%3Afalse%2C%22hideWeightage%22%3Atrue%2C%22showStudentDetails%22%3Afalse%2C%22border%22%3Afalse%2C%22shuffleMCQOptions%22%3Afalse%2C%22useDotPatternInBlanks%22%3Atrue%2C%22showHelpBoxInFillUp%22%3Afalse%2C%22mergeMatchItems%22%3Atrue%2C%22convertQForm%22%3A%7B%22MCQ%22%3A%7B%22toFillUp%22%3A0%2C%22toTF%22%3A0%2C%22toVSA%22%3A0%7D%2C%22flipTF%22%3Afalse%7D%2C%22spaceForAns%22%3A%7B%22Very%20Short%20Answer%20Type%22%3A1%2C%22Short%20Answer%20Type%22%3A3%2C%22Long%20Answer%20Type%22%3A5%2C%22Very%20Long%20Answer%20Type%22%3A8%2C%22Diagram%2FPicture%2FMap%20Based%22%3A6%7D%2C%22qTypesAllowedInImageQ%22%3A%5B%22Short%20Answer%20Type%22%2C%22Long%20Answer%20Type%22%2C%22Very%20Long%20Answer%20Type%22%2C%22Diagram%2FPicture%2FMap%20Based%22%5D%7D%7D&files=kips-6-ch-7%2Bkips-6-ch-8&diff=easy",
      quiz: "https://sourabhsuneja.github.io/quiz/play/?title=Computer+Quiz&quizID=Class+6+Quiz+Visit+from+Portal&exp=&quizType=individual&s=&q=kips-6-ch-7%2Bkips-6-ch-8&allowMCQ=y&allowTF=y&m=random&shuffle=n&qshuffle=y&qproceed=click&maxchances=3&countdown=0&allowCDPause=y&volume=100&customselect=y&usecards=n&killPrevSession=y&teammap=%7B%7D&absent=%5B%5D"
   },
   7: {
      classwork: "https://sourabhsuneja.github.io/question-paper/?ed=%7B%22schoolName%22%3A%22Jamna%20Vidyapeeth%22%2C%22examName%22%3A%22Answers%20of%20Chapter%207%20%26%208%22%2C%22subject%22%3A%22Computer%22%2C%22duration%22%3A60%2C%22grade%22%3A%22VII%22%7D&qpm=%7B%22kips-7-ch-7%22%3A%7B%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22MCQ%22%3A5%2C%22Short%20Answer%20Type%22%3A6%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22kips-7-ch-8%22%3A%7B%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22MCQ%22%3A5%2C%22Short%20Answer%20Type%22%3A3%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%7D&qc=%7B%22headings%22%3A%5B%22Fill%20ups%20(Ch-7)%3A%22%2C%22True%2FFalse%20(Ch-7)%3A%22%2C%22MCQs%20(Ch-7)%3A%22%2C%22Question%20Answers%20(Ch-7)%3A%22%2C%22Fill%20ups%20(Ch-8)%3A%22%2C%22True%2FFalse%20(Ch-8)%3A%22%2C%22MCQs%20(Ch-8)%3A%22%2C%22Question%20Answers%20(Ch-8)%3A%22%5D%2C%22qTypes%22%3A%5B%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22MCQ%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A6%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22MCQ%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A3%7D%5D%2C%22weightPerQ%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22mustInclude%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22settings%22%3A%7B%22provideAnsOrSpace%22%3A%22ans%22%2C%22randomiseSelection%22%3Afalse%2C%22strictChapterWiseDistribution%22%3Afalse%2C%22editable%22%3Afalse%2C%22showAIBtns%22%3Afalse%2C%22hideWeightage%22%3Atrue%2C%22showStudentDetails%22%3Afalse%2C%22border%22%3Afalse%2C%22shuffleMCQOptions%22%3Afalse%2C%22useDotPatternInBlanks%22%3Atrue%2C%22showHelpBoxInFillUp%22%3Afalse%2C%22mergeMatchItems%22%3Atrue%2C%22convertQForm%22%3A%7B%22MCQ%22%3A%7B%22toFillUp%22%3A0%2C%22toTF%22%3A0%2C%22toVSA%22%3A0%7D%2C%22flipTF%22%3Afalse%7D%2C%22spaceForAns%22%3A%7B%22Very%20Short%20Answer%20Type%22%3A1%2C%22Short%20Answer%20Type%22%3A3%2C%22Long%20Answer%20Type%22%3A5%2C%22Very%20Long%20Answer%20Type%22%3A8%2C%22Diagram%2FPicture%2FMap%20Based%22%3A6%7D%2C%22qTypesAllowedInImageQ%22%3A%5B%22Short%20Answer%20Type%22%2C%22Long%20Answer%20Type%22%2C%22Very%20Long%20Answer%20Type%22%2C%22Diagram%2FPicture%2FMap%20Based%22%5D%7D%7D&files=kips-7-ch-7%2Bkips-7-ch-8&diff=easy",
      quiz: "https://sourabhsuneja.github.io/quiz/play/?title=Computer+Quiz&quizID=Class+7+Quiz+Visit+from+Portal&exp=&quizType=individual&s=&q=kips-7-ch-7%2Bkips-7-ch-8&allowMCQ=y&allowTF=y&m=random&shuffle=n&qshuffle=y&qproceed=click&maxchances=3&countdown=0&allowCDPause=y&volume=100&customselect=y&usecards=n&killPrevSession=y&teammap=%7B%7D&absent=%5B%5D"
   },
   8: {
      classwork: "https://sourabhsuneja.github.io/question-paper/?ed=%7B%22schoolName%22%3A%22Jamna%20Vidyapeeth%22%2C%22examName%22%3A%22Answers%20of%20Chapter%204%22%2C%22subject%22%3A%22Data%20Science%22%2C%22duration%22%3A60%2C%22grade%22%3A%22VIII%22%7D&qpm=%7B%22kips-8-ch-4%22%3A%7B%22MCQ%22%3A10%2C%22True%2FFalse%22%3A5%2C%22Fill%20up%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Long%20Answer%20Type%22%3A3%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%7D&qc=%7B%22headings%22%3A%5B%22%22%2C%22%22%2C%22%22%2C%22%22%2C%22%22%5D%2C%22qTypes%22%3A%5B%7B%22MCQ%22%3A10%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%2C%7B%22Long%20Answer%20Type%22%3A3%7D%5D%2C%22weightPerQ%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22mustInclude%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22settings%22%3A%7B%22provideAnsOrSpace%22%3A%22ans%22%2C%22randomiseSelection%22%3Afalse%2C%22strictChapterWiseDistribution%22%3Afalse%2C%22editable%22%3Afalse%2C%22showAIBtns%22%3Afalse%2C%22hideWeightage%22%3Atrue%2C%22showStudentDetails%22%3Afalse%2C%22border%22%3Afalse%2C%22shuffleMCQOptions%22%3Afalse%2C%22useDotPatternInBlanks%22%3Atrue%2C%22showHelpBoxInFillUp%22%3Afalse%2C%22mergeMatchItems%22%3Atrue%2C%22convertQForm%22%3A%7B%22MCQ%22%3A%7B%22toFillUp%22%3A0%2C%22toTF%22%3A0%2C%22toVSA%22%3A0%7D%2C%22flipTF%22%3Afalse%7D%2C%22spaceForAns%22%3A%7B%22Very%20Short%20Answer%20Type%22%3A1%2C%22Short%20Answer%20Type%22%3A3%2C%22Long%20Answer%20Type%22%3A5%2C%22Very%20Long%20Answer%20Type%22%3A8%2C%22Diagram%2FPicture%2FMap%20Based%22%3A6%7D%2C%22qTypesAllowedInImageQ%22%3A%5B%22Short%20Answer%20Type%22%2C%22Long%20Answer%20Type%22%2C%22Very%20Long%20Answer%20Type%22%2C%22Diagram%2FPicture%2FMap%20Based%22%5D%7D%7D&files=kips-8-ch-4&diff=easy",
      quiz: "https://sourabhsuneja.github.io/quiz/play/?title=Data+Science+Quiz&quizID=Class+8+Quiz+Visit+from+Portal&exp=&quizType=individual&s=&q=kips-8-ch-4%2Bbetween-8-ch-4&allowMCQ=y&allowTF=y&m=random&shuffle=n&qshuffle=y&qproceed=click&maxchances=3&countdown=0&allowCDPause=y&volume=100&customselect=y&usecards=n&killPrevSession=y&teammap=%7B%7D&absent=%5B%5D"
   }
};
