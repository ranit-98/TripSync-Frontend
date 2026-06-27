import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const CmsPageWrapper = styled(Box)`
  min-height: 100vh;
  background: #fbfaf7;
  color: #171d1c;

  .cms_hero {
    padding: 88px 0 96px;
    background:
      linear-gradient(180deg, #fbfaf7 0%, #f3f8f6 100%);
  }

  .cms_hero_grid,
  .cms_workspace_layout {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.05fr);
    gap: 72px;
    align-items: center;
  }

  .cms_hero_copy {
    max-width: 690px;
  }

  .cms_kicker {
    margin: 0;
    color: #007267;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.15em;
  }

  .cms_kicker.gold {
    color: #d2a63f;
  }

  .cms_title,
  .cms_section_title {
    margin: 22px 0;
    font: 700 clamp(46px, 6.5vw, 90px) / 0.94 Georgia, serif;
    letter-spacing: 0;
  }

  .cms_title i,
  .cms_section_title i {
    color: #007267;
    font-weight: 400;
  }

  .cms_section_title {
    max-width: 980px;
    font-size: clamp(42px, 5.6vw, 76px);
  }

  .cms_section_title.compact {
    font-size: clamp(38px, 4.7vw, 64px);
  }

  .cms_section_copy,
  .cms_lead {
    max-width: 650px;
    color: #546966;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.72;
  }

  .cms_ctas {
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 34px;
  }

  .cms_ctas .MuiButton-root,
  .cms_final_cta .MuiButton-root {
    min-height: 50px;
    padding: 13px 24px;
    border-radius: 12px;
    font-weight: 900;
    text-transform: none;
  }

  .cms_product_scene {
    position: relative;
    min-height: 560px;
  }

  .cms_product_scene::before {
    position: absolute;
    top: 18px;
    right: 8px;
    width: 78%;
    height: 76%;
    border-radius: 30px;
    background: #efe8dc;
    content: '';
  }

  .cms_scene_photo {
    position: absolute;
    right: 74px;
    bottom: 0;
    width: 76%;
    height: 390px;
    border-radius: 24px;
    object-fit: cover;
    box-shadow: 0 28px 70px rgba(34, 58, 54, 0.2);
  }

  .cms_workspace_card {
    position: absolute;
    top: 70px;
    left: 0;
    width: min(520px, 90%);
    padding: 26px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 28px 64px rgba(0, 114, 103, 0.18);
  }

  .cms_card_top {
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .cms_card_top span,
  .cms_metric small {
    display: block;
    color: #6f817e;
    font-size: 12px;
    font-weight: 800;
  }

  .cms_card_top strong {
    display: block;
    margin-top: 6px;
    font: 700 24px Georgia, serif;
  }

  .cms_status {
    padding: 7px 12px;
    border-radius: 999px;
    background: #dcf5ed;
    color: #007267;
    font-size: 12px;
    font-weight: 900;
  }

  .cms_tab_row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 24px 0;
  }

  .cms_tab_row span,
  .cms_panel_nav span {
    padding: 8px 11px;
    border-radius: 999px;
    background: #eef5f3;
    color: #38524e;
    font-size: 12px;
    font-weight: 900;
  }

  .cms_preview_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .cms_metric,
  .cms_activity {
    min-height: 98px;
    padding: 16px;
    border: 1px solid #e2ece8;
    border-radius: 14px;
    background: #fbfdfc;
  }

  .cms_metric.primary {
    background: #007267;
    color: white;
  }

  .cms_metric.primary small {
    color: rgba(255, 255, 255, 0.72);
  }

  .cms_metric b {
    display: block;
    margin-top: 12px;
    font-size: 27px;
  }

  .cms_activity {
    display: flex;
    gap: 10px;
    align-items: center;
    color: #22423e;
    font-size: 13px;
    font-weight: 800;
  }

  .cms_activity svg {
    color: #007267;
  }

  .cms_activity.soft svg {
    color: #cc7a3f;
  }

  .cms_feature_section {
    padding: 106px 0;
    background: #161b1a;
    color: white;
  }

  .cms_section_head {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.55fr);
    gap: 48px;
    align-items: end;
  }

  .cms_feature_section .cms_section_copy {
    color: rgba(255, 255, 255, 0.68);
  }

  .cms_feature_grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-top: 54px;
  }

  .cms_feature {
    min-height: 250px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 8px;
    background:
      linear-gradient(145deg, rgba(0, 114, 103, 0.26), rgba(255, 255, 255, 0.04));
  }

  .cms_feature_icon {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 10px;
    background: rgba(210, 166, 63, 0.16);
    color: #efc86a;
  }

  .cms_feature h3 {
    margin: 44px 0 12px;
    font: 700 23px Georgia, serif;
  }

  .cms_feature p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.62;
  }

  .cms_workspace_section {
    padding: 112px 0;
    background: #f6f2ea;
  }

  .cms_workspace_panel {
    overflow: hidden;
    border: 1px solid #dbe6e2;
    border-radius: 24px;
    background: white;
    box-shadow: 0 28px 70px rgba(51, 71, 67, 0.12);
  }

  .cms_panel_nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 18px;
    border-bottom: 1px solid #e5eeeb;
    background: #fbfdfc;
  }

  .cms_panel_nav span.active {
    background: #007267;
    color: white;
  }

  .cms_panel_body {
    display: grid;
    gap: 16px;
    padding: 22px;
  }

  .cms_day_card,
  .cms_chat_strip {
    padding: 20px;
    border: 1px solid #e2ece8;
    border-radius: 14px;
    background: #fbfdfc;
  }

  .cms_day_card span {
    color: #007267;
    font-size: 12px;
    font-weight: 900;
  }

  .cms_day_card strong,
  .cms_day_card small {
    display: block;
  }

  .cms_day_card strong {
    margin-top: 8px;
    font-size: 20px;
  }

  .cms_day_card small {
    margin-top: 8px;
    color: #667875;
    font-weight: 700;
  }

  .cms_chat_strip {
    display: flex;
    gap: 12px;
    align-items: center;
    background: #fff7e6;
    color: #59472b;
    font-weight: 800;
  }

  .cms_steps {
    padding: 106px 0;
    background: #fbfaf7;
  }

  .centered {
    margin-right: auto;
    margin-left: auto;
    text-align: center;
  }

  .cms_step {
    display: grid;
    max-width: 780px;
    grid-template-columns: 120px minmax(0, 1fr);
    gap: 34px;
    align-items: center;
    margin: 46px auto;
  }

  .cms_step > span {
    color: rgba(0, 114, 103, 0.16);
    font: 700 76px Georgia, serif;
  }

  .cms_step h3 {
    margin: 0 0 8px;
    font: 700 31px Georgia, serif;
  }

  .cms_step p {
    margin: 0;
    color: #586b68;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.62;
  }

  .cms_settlement {
    padding: 108px 0;
    background: #eaf4f0;
  }

  .cms_flow {
    display: flex;
    gap: 14px;
    align-items: center;
    justify-content: space-between;
    margin-top: 42px;
    padding: 18px;
    border: 1px solid #d7e7e1;
    border-radius: 16px;
    background: white;
    color: #007267;
    font-weight: 900;
  }

  .cms_flow span {
    flex: 1;
    padding: 12px 10px;
    border-radius: 12px;
    background: #f5faf8;
    text-align: center;
  }

  .cms_final_cta {
    padding: 96px 0;
    background: #171d1c;
    color: white;
    text-align: center;
  }

  .cms_final_cta .cms_kicker {
    color: #efc86a;
  }

  .cms_final_cta .cms_section_title {
    margin-bottom: 34px;
  }

  @media (max-width: 1100px) {
    .cms_hero_grid,
    .cms_workspace_layout,
    .cms_section_head {
      grid-template-columns: 1fr;
    }

    .cms_feature_grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .cms_product_scene {
      min-height: 520px;
    }
  }

  @media (max-width: 700px) {
    .cms_hero,
    .cms_feature_section,
    .cms_workspace_section,
    .cms_steps,
    .cms_settlement,
    .cms_final_cta {
      padding: 64px 0;
    }

    .cms_title {
      font-size: 52px;
    }

    .cms_section_title,
    .cms_section_title.compact {
      font-size: 39px;
    }

    .cms_product_scene {
      min-height: 560px;
    }

    .cms_scene_photo {
      right: 0;
      width: 100%;
      height: 320px;
    }

    .cms_workspace_card {
      top: 24px;
      width: 100%;
      padding: 20px;
    }

    .cms_preview_grid,
    .cms_feature_grid {
      grid-template-columns: 1fr;
    }

    .cms_step {
      grid-template-columns: 1fr;
      gap: 8px;
      margin: 36px 0;
    }

    .cms_step > span {
      font-size: 56px;
    }

    .cms_flow {
      flex-direction: column;
      align-items: stretch;
    }

    .cms_flow svg {
      align-self: center;
      transform: rotate(90deg);
    }
  }
`;
