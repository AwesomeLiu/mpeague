import Image from "next/image";
import { PlayerRankEnum } from "@/lib/types";
import Container from "@/components/container";
import TeamRank from "@/components/team/teamRank";
import News from "@/components/news";
import PlayerRankWrapper from "@/components/player/playerRankWrapper";
import PlayerRank from "@/components/player/playerRank";
import MajorPic from "../public/hero.png";

export default async function Page() {
  return (
    <>
      <section className="h-[60vh] flex items-center justify-center bg-[#e5e5e5] mb-[80px]" role="carousel">
        <Image
          src={MajorPic}
          alt="M-Peague Logo"
        />
      </section>
      <Container cns="w-[1280px]">
        <section className="text-center font-bold mb-[80px]" role="intro">
          <h1 className="text-4xl mb-[16px]">What is M.PEAGUE</h1>
          <h2 className="text-xl mb-[36px]">没屁股杯</h2>
          <p className="w-[800px] mx-auto mb-[36px]">这里是介绍没屁股杯的内容麻雀プロリーグ戦、Mリーグ開幕。数多の麻雀プレイヤー達の中から、ほんの一握りのトッププロだけが出場できるナショナルリーグが始まる。知性に裏打ちされた采配。洗練されたリーグ空間。企業とプロ契約を結び、ユニフォームを纏ったMリーガー達がチームの威信をかけて知を競い合う。さぁ、麻雀をあたらしい時代へ。</p>
          <button className="btn btn-border">了解更多</button>
        </section>
        <section className="text-center mb-[80px]" role="team-score-list">
          <h1 className="text-4xl mb-[16px] font-bold text-center">RANKING</h1>
          <h2 className="text-xl mb-[36px] font-bold text-center">排名</h2>
          <TeamRank />
        </section>
        <section className="mb-[80px]" role="player-score-list">
          <h1 className="text-4xl mb-[16px] font-bold text-center">PLAYERS</h1>
          <h2 className="text-xl mb-[36px] font-bold text-center">个人成绩</h2>
          <PlayerRankWrapper>
            <PlayerRank title="个人总分" type={PlayerRankEnum.SCORE} />
            <PlayerRank title="最高打点" type={PlayerRankEnum.POINT} />
            <PlayerRank title="避四率" type={PlayerRankEnum.AVOID} />
          </PlayerRankWrapper>
        </section>
        <section role="news">
          <h1 className="text-4xl mb-[16px] font-bold text-center">NEWS</h1>
          <h2 className="text-xl mb-[36px] font-bold text-center">新闻</h2>
          <div className="flex justify-between gap-[50px] mb-[24px]">
            <News
              cover="/img-bird.svg"
              title="大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻大新闻"
              date="2023-06-06"
            />
            <News
              cover="/hero.png"
              title="小新闻"
              date="2023-06-04"
            />
            <News
              cover="/hero.png"
              title="小新闻"
              date="2023-05-28"
            />
          </div>
          <button className="block mx-auto font-bold btn btn-border">查看更多</button>
        </section>
      </Container>
    </>
  );
}
