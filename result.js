'use strict'
{
  const score = document.getElementById("resultScore");
  const miss = document.getElementById("resultMiss");
  const doneCnt = document.getElementById("resultDoneCnt");
  const wordsCnt = document.getElementById("wordsCnt");

  const result = JSON.parse(sessionStorage.getItem("result"));

  score.textContent = result["resultScore"];
  miss.textContent = result["resultMiss"];
  doneCnt.textContent = result["resultDoneCnt"];
  wordsCnt.textContent = result["wordsCnt"];
}