'use strict'
{
  const score = document.getElementById("resultScore");
  const miss = document.getElementById("resultMiss");
  const doneCnt = document.getElementById("resultDoneCnt");
  const wordsCnt = document.getElementById("wordsCnt");
  const timeRemain = document.getElementById("timeRemain");

  const result = JSON.parse(sessionStorage.getItem("result"));

  score.textContent = result["resultScore"];
  miss.textContent = result["resultMiss"];
  doneCnt.textContent = result["resultDoneCnt"];
  wordsCnt.textContent = result["wordsCnt"];

  if (result["resultDoneCnt"] === result["wordsCnt"]) {
    timeRemain.textContent = "余った時間： " + result["timeRemain"] + " 秒";
  }
}