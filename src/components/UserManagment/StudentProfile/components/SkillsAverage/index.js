const skillsAverage = evaluations => {
  const skillsAverage = {
    listenning: 0,
    speaking: 0,
    writting: 0,
    reading: 0
  };
  const averages = [];

  evaluations.forEach(eva => {
    if (eva.skills) {
      for (const key in eva.skills) {
        if (key !== '__typename' && eva.skills.hasOwnProperty(key)) {
          const skill = eva.skills[key];
          skillsAverage[key] += skill;
        }
      }
    }
  });

  for (const key in skillsAverage) {
    if (key !== '__typename' && skillsAverage.hasOwnProperty(key)) {
      const skill = skillsAverage[key];
      // The rounded average is determined
      averages.push({
        skill: key,
        average: Number((skill / evaluations.length).toFixed())
      });
    }
  }

  // Ordering the result from smallest to largest
  averages.sort((a, b) => a.average - b.average);
  return averages;
};

export { skillsAverage };
