import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { Search, Bell, Plus, Heart, MessageCircle, Share2, Bookmark, ChevronRight, Sparkles, Rocket, Lightbulb, Handshake, Users, ArrowLeft, Star, MapPin, Clock, Filter, TrendingUp, Zap, Target, Compass, Send, X, Check, ChevronDown, Globe, Award, Eye, UserPlus, Home, Grid3X3, User, Settings, Menu, Play, ExternalLink, Flame, Trophy, Calendar, Coffee, BookOpen, ArrowRight, Quote, Hash, Paperclip, FileText, CheckSquare, Image, MoreHorizontal, Phone, Video, Smile, AtSign, Link, FolderOpen, ClipboardList, Lock, Mail, Briefcase, ChevronLeft, LogIn, LogOut } from "lucide-react";
import * as recharts from "recharts";
import logo from './logo.png';
const { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } = recharts;

// ============================================
// i18n TRANSLATION SYSTEM
// ============================================
const LangContext = createContext("en");
function useLang() { return useContext(LangContext); }

const TRANSLATIONS = {
  en: {
    nav_home: "Home", nav_explore: "Explore", nav_match: "Match", nav_create: "Create", nav_space_base: "Space Base", nav_community: "Community", nav_programs: "Programs", nav_alerts: "Alerts", nav_chat: "Chat", nav_workspace: "Workspace",
    landing_hero_stat_1: "850+ projects launched by real creators",
    landing_hero_title_1: "Don't Just Dream It.", landing_hero_title_2: "Find Your Team & Build It.",
    landing_hero_subtitle: "Post a spark, meet your dream team through AI, and turn wild ideas into reality — together.",
    landing_hero_cta_1: "Explore Ideas", landing_hero_cta_2: "Find Your Match",
    landing_live_stat_1: "42 creators", landing_live_stat_2: "active right now", landing_live_stat_3: "3 new matches", landing_live_stat_4: "made today",
    landing_trusted_by: "Trusted by creators from",
    stat_creators: "Creators", stat_projects: "Projects Launched", stat_matches: "Matches Made", stat_countries: "Countries",
    methodology_title: "Perceive. Connect. Create.", methodology_sub: "Our methodology, distilled from Stanford d.school, MIT, and Y Combinator",
    step_share: "Share", step_match: "Match", step_connect: "Connect", step_create: "Create",
    step_share_desc: "Post your rawest idea. No pitch deck required — just your spark of inspiration.",
    step_match_desc: "AI finds creators whose skills, values, and energy complement yours perfectly.",
    step_connect_desc: "Start real conversations. Form teams that feel like they were meant to exist.",
    step_create_desc: "Build together in shared spaces. Ship something real, every single week.",
    challenge_title: "This Week's Challenge", challenge_join: "Join 142 creators already participating",
    challenge_left: "3 days left", challenge_name: "Ship Something Small",
    challenge_desc: "Build and share a micro-project in under 48 hours. Constraints breed creativity. Earn 200 XP.",
    challenge_cta: "Join This Challenge",
    event_badge: "Upcoming Event", event_hack: "72-Hour Hackathon",
    event_name: "Space Base Challenge", event_desc: "Cross-cultural, cross-disciplinary hackathon. 4 tracks. 3 cities. 72 hours. Ship something real.",
    event_cities: "Beijing · New York", event_teams: "Teams of 2-4 students", event_sprint: "3-day in-person sprint",
    event_cta_1: "Explore Challenge", event_cta_2: "View Tracks & Teams",
    stories_title: "Real Creators, Real Stories", stories_sub: "What happens when ideas meet their dream team", our_story: "Our Story",
    trending: "Trending This Week", see_all: "See All", spotlight: "Creator Spotlight",
    cta_title: "Your idea deserves a team.", cta_desc: "Join 2,400+ creators who stopped waiting for permission and started building. It takes 30 seconds.",
    cta_btn: "Share Your First Idea",
    footer_1: "From Meta-Point, To Infinite Possibilities", footer_2: "Building the future, one creator at a time.",
    community_title: "Creator Community", community_sub: "Challenges, streaks, and your creator journey",
    journey_title: "Your Creator Journey", streak: "Streak", ideas_shared: "Ideas Shared", collabs: "Collabs", xp_week: "XP This Week",
    tab_challenges: "Challenges", tab_leaderboard: "Leaderboard", tab_this_week: "This Week",
    join_challenge: "Join Challenge", completed_challenges: "Completed Challenges", winner: "Winner",
    highlight_week: "Highlight of the Week", milestones: "Community Milestones",
    search_placeholder: "Search...", no_results: "No results found. Try different filters!",
    back: "Back", looking_for: "Looking For", interested_cta: "I'm Interested — Let's Collaborate",
    discussion: "Discussion", comment_placeholder: "Share your thoughts...", send: "Send",
    creator_dna: "Creator DNA", skill_profile: "Skill & capability profile",
    skills: "Skills", interests: "Interests", values: "Values", badges: "Badges",
    posts_by: "Posts by", projects: "Projects", day_streak: "Day Streak", connect: "Connect", message: "Message",
    match_title: "AI Match Hub", match_sub: "Describe what you're building and we'll find your ideal collaborators",
    match_stat: "3,200+ successful matches and counting",
    match_q1: "What are you building?", match_q2: "What skills do you need?",
    match_cta: "Find My Dream Team", match_loading: "Finding Your Matches...", match_analyzing: "Analyzing 2,400+ creator profiles...",
    match_results: "Top Matches for You", why_match: "Why you match", invite_collab: "Invite to Collaborate", profile: "Profile",
    create_title: "Create a Post", create_sub: "Share your idea with the world — earn XP and find collaborators",
    create_what: "What are you sharing?",
    type_idea: "Idea", type_project: "Project", type_team: "Looking for Team", type_story: "Story",
    type_idea_desc: "A raw concept or inspiration", type_project_desc: "An active project with updates",
    type_team_desc: "Find collaborators", type_story_desc: "Personal reflection or lesson",
    tell_more: "Tell us more", title: "Title", title_ph: "Give your post a compelling title...",
    description: "Description", desc_ph: "Describe your idea, what problem it solves, and what makes it exciting...",
    tags_label: "Tags (up to 6)", tag_ph: "Add a tag...", add: "Add",
    preview: "Preview", preview_title: "Preview Your Post", edit: "Edit",
    publish: "Publish (+50 XP)", published: "Published!", xp_earned: "+50 XP earned!",
    published_desc: "Your post is live. We're already looking for matching collaborators to notify.",
    view_feed: "View in Feed", create_another: "Create Another",
    collab_header: "Applications Open — 28 Teams, 3 Cities",
    collab_tagline: "72 hours. 3 cities. 1 mission: Design humanity's future beyond Earth. A cross-cultural, cross-disciplinary creative hackathon where every team ships something real.",
    apply_now: "Apply Now", find_teammates: "Find Teammates",
    duration: "Duration", team_size: "Team Size", cities: "Cities", output: "Output", prototype: "Prototype",
    how_it_works: "How It Works",
    step1: "1 week online pre-match", step2: "3-day in-person hackathon", step3: "Working prototype + 5-min pitch",
    not_lecture: "This is not a lecture series or a panel discussion. Every participant ships something real.",
    choose_track: "Choose Your Track", timeline: "Timeline", three_cities: "3 Cities, Simultaneously",
    teams_forming: "Teams Forming Now", spot_open: "spot open", spots_open: "spots open",
    looking_for_label: "Looking for:", members_label: "Members:", join_team: "Join Team",
    what_ship: "What You'll Ship",
    output_tech: "Tech Demo", output_design: "Design System", output_narrative: "Interactive Narrative", output_video: "Video / Film",
    ready_stars: "Ready to build for the stars?", crew_waiting: "28 teams across 3 cities. 72 hours to ship. Your crew is waiting.",
    apply_individual: "Apply as Individual", apply_team: "Apply as Team",
    apply_title: "Apply to Space Base Challenge",
    form_name: "Full Name", form_track: "Preferred Track", form_city: "Preferred City",
    form_contribution: "What will you bring to your team?", form_submit: "Submit Application",
    programs_title: "Programs & Events", programs_sub: "Immersive experiences that accelerate your creative journey",
    notif_title: "Notifications", mark_read: "Mark all read",
    xp_next: "XP to next level",
    chat_title: "Messages", chat_teams: "Team Chats", chat_dms: "Direct Messages",
    chat_no_conv: "No conversations yet", chat_start: "Start chatting with your matches and teammates",
    chat_find: "Find People", chat_ph: "Type a message...",
    online: "Online", offline: "Offline", typing: "typing...",
    workspace_title: "Team Workspace", ws_tasks: "Tasks", ws_files: "Files", ws_notes: "Notes", ws_brief: "Project Brief",
    ws_add_task: "Add task...", ws_members: "Team Members", ws_shared: "Shared Files", ws_no_files: "No files yet",
    ws_add_note: "Add a note...", ws_progress: "Progress", ws_deadline: "Deadline", ws_status_active: "Active"
  },
  zh: {
    nav_home: "首页", nav_explore: "发现", nav_match: "匹配", nav_create: "创作", nav_space_base: "太空营地", nav_community: "社区", nav_programs: "项目", nav_alerts: "通知", nav_chat: "消息", nav_workspace: "工作区",
    landing_hero_stat_1: "850+ 个项目由真实创作者发起",
    landing_hero_title_1: "别只是幻想。", landing_hero_title_2: "找到你的团队，一起创造。",
    landing_hero_subtitle: "全球首个以创意为中心的社交平台。分享灵感火花，通过 AI 遇见梦想团队，一起将疯狂想法变成现实。",
    landing_hero_cta_1: "探索创意", landing_hero_cta_2: "找到匹配者",
    landing_live_stat_1: "42 位创作者", landing_live_stat_2: "正在线上", landing_live_stat_3: "3 个新匹配", landing_live_stat_4: "今日达成",
    landing_trusted_by: "受信于来自以下机构的创作者",
    stat_creators: "创作者", stat_projects: "项目已上线", stat_matches: "成功匹配", stat_countries: "个国家",
    methodology_title: "感知·连接·创造", methodology_sub: "我们的方法汲取自 Stanford d.school、MIT 和 Y Combinator 的精华",
    step_share: "分享", step_match: "匹配", step_connect: "连接", step_create: "创造",
    step_share_desc: "分享你最原始的想法。不需要商业企划书，只需要你的灵感火花。",
    step_match_desc: "AI 帮你找到技能互补、价值观相近、能量相通的创作者。",
    step_connect_desc: "开启真诚对话，组建天生就该相遇的团队。",
    step_create_desc: "在共享空间中协作，每周都能交付真实的作品。",
    challenge_title: "本周挑战赛", challenge_join: "已有 142 位创作者参与",
    challenge_left: "还剩 3 天", challenge_name: "快速交付小项目",
    challenge_desc: "在 48 小时内完成并分享一个微项目。限制激发创意。获得 200 XP。",
    challenge_cta: "加入挑战赛",
    event_badge: "即将开展", event_hack: "72 小时黑客松",
    event_name: "太空营地挑战赛", event_desc: "跨文化、跨学科的黑客松。4 个赛道。3 个城市。72 小时。交付真实产品。",
    event_cities: "北京·旧金山·伦敦", event_teams: "2-4 人学生团队", event_sprint: "3 天线下集中创作",
    event_cta_1: "了解挑战赛", event_cta_2: "查看赛道与团队",
    stories_title: "真实创作者，真实故事", stories_sub: "当想法遇到梦想团队时发生了什么", our_story: "我们的故事",
    trending: "本周热门", see_all: "查看全部", spotlight: "创作者聚光灯",
    cta_title: "你的想法值得一个团队。", cta_desc: "加入 2,400+ 位创作者，他们不再等待许可，而是开始行动。只需 30 秒。",
    cta_btn: "分享你的第一个想法",
    footer_1: "从灵感之点，到无限可能", footer_2: "一次创造一个创作者的未来。",
    community_title: "创作者社区", community_sub: "挑战赛、连胜记录和你的创作之旅",
    journey_title: "你的创作之旅", streak: "连胜", ideas_shared: "已分享想法", collabs: "协作", xp_week: "本周 XP",
    tab_challenges: "挑战赛", tab_leaderboard: "排行榜", tab_this_week: "本周",
    join_challenge: "加入挑战赛", completed_challenges: "已完成的挑战赛", winner: "冠军",
    highlight_week: "本周精选", milestones: "社区里程碑",
    search_placeholder: "搜索...", no_results: "未找到结果。尝试不同的筛选条件！",
    back: "返回", looking_for: "寻找", interested_cta: "我有兴趣，一起合作吧",
    discussion: "讨论", comment_placeholder: "分享你的想法...", send: "发送",
    creator_dna: "创作者 DNA", skill_profile: "技能与能力档案",
    skills: "技能", interests: "兴趣", values: "价值观", badges: "徽章",
    posts_by: "作品来自", projects: "项目", day_streak: "连胜天数", connect: "关注", message: "私信",
    match_title: "AI 匹配中心", match_sub: "描述你的创意方向，我们帮你找到理想的合作者",
    match_stat: "200+ 次成功匹配，还在增长",
    match_q1: "你正在创作什么？", match_q2: "你需要什么技能？",
    match_cta: "找到我的梦想团队", match_loading: "正在为你匹配...", match_analyzing: "分析中 2,400+ 位创作者资料...",
    match_results: "为你精选的匹配", why_match: "匹配原因", invite_collab: "邀请合作", profile: "个人资料",
    create_title: "发布想法", create_sub: "与世界分享你的想法，赚取 XP 并找到合作者",
    create_what: "你想分享什么？",
    type_idea: "想法", type_project: "项目", type_team: "招募团队", type_story: "故事",
    type_idea_desc: "一个原始概念或灵感", type_project_desc: "一个正在进行中的项目",
    type_team_desc: "寻找合作者", type_story_desc: "个人思考或经验分享",
    tell_more: "更多细节", title: "标题", title_ph: "给你的想法起个引人注目的标题...",
    description: "描述", desc_ph: "描述你的想法、它解决什么问题，以及为什么它令人兴奋...",
    tags_label: "标签（最多 6 个）", tag_ph: "添加标签...", add: "添加",
    preview: "预览", preview_title: "预览你的想法", edit: "编辑",
    publish: "发布（+50 XP）", published: "已发布！", xp_earned: "+50 XP 已获得！",
    published_desc: "你的想法已上线。我们正在为你寻找匹配的合作者。",
    view_feed: "在信息流中查看", create_another: "继续发布",
    collab_header: "现已开放申请 — 28 支团队，3 个城市",
    collab_tagline: "72 小时、3 个城市、1 个使命：为人类的地外未来做设计。跨文化、跨学科的黑客松，每支团队都必须交付真实作品。",
    apply_now: "立即申请", find_teammates: "寻找队友",
    duration: "时长", team_size: "团队规模", cities: "城市", output: "成果", prototype: "原型",
    how_it_works: "运作方式",
    step1: "1 周线上预选与匹配", step2: "3 天线下黑客松", step3: "可用原型 + 5 分钟演讲",
    not_lecture: "这不是讲座或论坛。每位参赛者都要交付真实作品。",
    choose_track: "选择赛道", timeline: "时间表", three_cities: "3 个城市，同时进行",
    teams_forming: "正在组队中", spot_open: "个名额开放", spots_open: "个名额开放",
    looking_for_label: "寻找：", members_label: "已有成员：", join_team: "加入团队",
    what_ship: "你将交付",
    output_tech: "技术演示", output_design: "设计系统", output_narrative: "互动叙事", output_video: "视频 / 电影",
    ready_stars: "准备好为星辰而建造了吗？", crew_waiting: "28 支团队，3 个城市，72 小时完成任务。你的队伍在等你。",
    apply_individual: "个人申请", apply_team: "团队申请",
    apply_title: "申请加入太空营地挑战赛",
    form_name: "全名", form_track: "偏好赛道", form_city: "偏好城市",
    form_contribution: "你将为团队贡献什么？", form_submit: "提交申请",
    programs_title: "项目与活动", programs_sub: "沉浸式体验，加速你的创作之旅",
    notif_title: "通知", mark_read: "标记全部已读",
    xp_next: "升级所需 XP",
    chat_title: "消息", chat_teams: "团队群聊", chat_dms: "私信",
    chat_no_conv: "还没有对话", chat_start: "与匹配者和队友开启对话",
    chat_find: "查找", chat_ph: "输入消息...",
    online: "在线", offline: "离线", typing: "输入中...",
    workspace_title: "团队工作区", ws_tasks: "任务", ws_files: "文件", ws_notes: "笔记", ws_brief: "项目简介",
    ws_add_task: "添加任务...", ws_members: "团队成员", ws_shared: "共享文件", ws_no_files: "还没有文件",
    ws_add_note: "添加笔记...", ws_progress: "进度", ws_deadline: "截止日期", ws_status_active: "进行中"
  }
};

function t(key, lang) { return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key; }

// ============================================
// MOCK DATA
// ============================================
const CREATORS = [
  { id: 1, name: "Maya Chen", avatar: "MC", bio: "AI researcher × visual artist. Building tools that make creativity accessible to everyone.", location: "San Francisco", skills: ["AI/ML", "Visual Design", "Python", "Creative Coding"], interests: ["Generative Art", "Education", "Open Source"], values: ["Accessibility", "Collaboration", "Innovation"], projects: 4, collaborations: 7, badges: ["Early Creator", "Top Matcher", "Mentor"], color: "#FF6B6B", streak: 12, level: 3, xp: 2400,
    skillData: [{ skill: "Technical", value: 85 }, { skill: "Design", value: 90 }, { skill: "Strategy", value: 60 }, { skill: "Communication", value: 75 }, { skill: "Leadership", value: 65 }, { skill: "Research", value: 80 }]
  },
  { id: 2, name: "Leo Park", avatar: "LP", bio: "Product designer who believes great design is invisible. Previously at Figma & Notion.", location: "Seoul", skills: ["UI/UX", "Figma", "Prototyping", "Design Systems"], interests: ["Minimalism", "Accessibility", "Developer Tools"], values: ["Simplicity", "Craft", "Impact"], projects: 6, collaborations: 12, badges: ["Design Lead", "Community Builder"], color: "#4ECDC4", streak: 28, level: 5, xp: 4800,
    skillData: [{ skill: "Technical", value: 55 }, { skill: "Design", value: 95 }, { skill: "Strategy", value: 70 }, { skill: "Communication", value: 85 }, { skill: "Leadership", value: 75 }, { skill: "Research", value: 60 }]
  },
  { id: 3, name: "Aria Santos", avatar: "AS", bio: "Social entrepreneur & storyteller. Passionate about education access in emerging markets.", location: "Manila", skills: ["Storytelling", "Marketing", "Community Building", "Strategy"], interests: ["EdTech", "Social Impact", "Documentary"], values: ["Equity", "Empathy", "Courage"], projects: 3, collaborations: 9, badges: ["Storyteller", "Impact Maker"], color: "#FFB84D", streak: 7, level: 4, xp: 3200,
    skillData: [{ skill: "Technical", value: 35 }, { skill: "Design", value: 50 }, { skill: "Strategy", value: 90 }, { skill: "Communication", value: 95 }, { skill: "Leadership", value: 85 }, { skill: "Research", value: 70 }]
  },
  { id: 4, name: "Kai Nakamura", avatar: "KN", bio: "Full-stack engineer turned indie maker. Shipping one micro-product every month.", location: "Tokyo", skills: ["React", "Node.js", "AWS", "TypeScript"], interests: ["Indie Hacking", "SaaS", "Automation"], values: ["Speed", "Simplicity", "Independence"], projects: 12, collaborations: 5, badges: ["Prolific Builder", "Speed Demon"], color: "#A78BFA", streak: 45, level: 6, xp: 6100,
    skillData: [{ skill: "Technical", value: 95 }, { skill: "Design", value: 45 }, { skill: "Strategy", value: 65 }, { skill: "Communication", value: 50 }, { skill: "Leadership", value: 55 }, { skill: "Research", value: 70 }]
  },
  { id: 5, name: "Zara Okonkwo", avatar: "ZO", bio: "Neuroscience PhD × game designer. Creating experiences that change how people think.", location: "London", skills: ["Game Design", "Unity", "Research", "Psychology"], interests: ["Serious Games", "Mental Health", "VR"], values: ["Curiosity", "Depth", "Wellness"], projects: 5, collaborations: 8, badges: ["Researcher", "Creative Technologist"], color: "#F472B6", streak: 19, level: 4, xp: 3800,
    skillData: [{ skill: "Technical", value: 70 }, { skill: "Design", value: 80 }, { skill: "Strategy", value: 60 }, { skill: "Communication", value: 65 }, { skill: "Leadership", value: 50 }, { skill: "Research", value: 95 }]
  },
  { id: 6, name: "River Zhang", avatar: "RZ", bio: "Climate tech enthusiast & data scientist. Using data to drive environmental action.", location: "Beijing", skills: ["Data Science", "Python", "Climate Modeling", "Visualization"], interests: ["Climate Action", "Open Data", "Policy"], values: ["Sustainability", "Transparency", "Scale"], projects: 3, collaborations: 6, badges: ["Data Wizard", "Earth Guardian"], color: "#34D399", streak: 33, level: 5, xp: 5200,
    skillData: [{ skill: "Technical", value: 88 }, { skill: "Design", value: 40 }, { skill: "Strategy", value: 72 }, { skill: "Communication", value: 55 }, { skill: "Leadership", value: 48 }, { skill: "Research", value: 92 }]
  }
];

const POSTS = [
  { id: 1, type: "idea", title: "AI-Powered Language Learning Through Music", description: "What if you could learn any language by singing songs in that language? AI analyzes your pronunciation, rhythm, and meaning comprehension in real-time. Music makes grammar intuitive and vocabulary memorable.", image: "🎵", gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFB84D 100%)", creator: CREATORS[0], likes: 234, comments: 45, saves: 89, tags: ["AI", "EdTech", "Music", "Language"], stage: "Concept", lookingFor: ["Music Producer", "Linguist", "Mobile Developer"], timeAgo: "2h ago" },
  { id: 2, type: "project", title: "MindMap: Collaborative Thinking Canvas", description: "Building an infinite canvas where teams can think together in real-time. Like Miro meets Notion, but powered by AI that organizes your chaos into clarity. Beta launching next month!", image: "🧠", gradient: "linear-gradient(135deg, #4ECDC4 0%, #2D3A8C 100%)", creator: CREATORS[1], likes: 567, comments: 123, saves: 201, tags: ["Productivity", "Design Tool", "Collaboration"], stage: "Beta", lookingFor: ["Backend Engineer", "Growth Marketer"], timeAgo: "5h ago" },
  { id: 3, type: "lookingForTeam", title: "Seeking Co-Founder for Education Platform", description: "I have deep expertise in education access in Southeast Asia, strong connections with 50+ schools, and a clear vision. Looking for a technical co-founder who shares the passion for making quality education universally accessible.", image: "🌏", gradient: "linear-gradient(135deg, #FFB84D 0%, #FF6B6B 100%)", creator: CREATORS[2], likes: 189, comments: 67, saves: 156, tags: ["EdTech", "Social Impact", "Southeast Asia"], stage: "Co-Founder Search", lookingFor: ["Technical Co-Founder", "Product Designer"], timeAgo: "12h ago" },
  { id: 4, type: "project", title: "ShipFast: One-Click Deploy for Indie Makers", description: "Tired of spending days on deployment? ShipFast lets you go from code to production in 60 seconds. Next.js, databases, auth — all configured. Already serving 200+ indie makers.", image: "🚀", gradient: "linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)", creator: CREATORS[3], likes: 892, comments: 234, saves: 445, tags: ["DevTools", "SaaS", "Indie Hacking"], stage: "Live", lookingFor: ["DevRel", "Community Manager"], timeAgo: "1d ago" },
  { id: 5, type: "idea", title: "Empathy Engine: VR Experiences That Build Understanding", description: "A series of VR experiences that let you literally walk in someone else's shoes. Experience a day as a refugee, a person with disabilities, or someone from a completely different culture. Using neuroscience to maximize empathy formation.", image: "🥽", gradient: "linear-gradient(135deg, #F472B6 0%, #A78BFA 100%)", creator: CREATORS[4], likes: 445, comments: 98, saves: 267, tags: ["VR", "Social Impact", "Neuroscience", "Games"], stage: "Research", lookingFor: ["VR Developer", "Documentary Filmmaker", "UX Researcher"], timeAgo: "1d ago" },
  { id: 6, type: "story", title: "What 2 Years of Traveling Taught Me About Creation", description: "After visiting 50+ countries and meeting creators in every corner of the world, I realized the best ideas don't come from thinking — they come from feeling. Here's what I learned about the creative process by stepping outside my comfort zone.", image: "✈️", gradient: "linear-gradient(135deg, #34D399 0%, #2D3A8C 100%)", creator: CREATORS[5], likes: 1203, comments: 345, saves: 567, tags: ["Reflection", "Travel", "Creativity", "Personal Growth"], stage: "Published", lookingFor: [], timeAgo: "2d ago" },
  { id: 7, type: "idea", title: "Climate Action Dashboard for Cities", description: "Real-time visualization of a city's carbon footprint, renewable energy usage, and environmental health. Open data + beautiful design to make climate action tangible for city planners and citizens.", image: "🌍", gradient: "linear-gradient(135deg, #34D399 0%, #FFB84D 100%)", creator: CREATORS[5], likes: 378, comments: 89, saves: 198, tags: ["Climate", "Data Viz", "Open Data", "Civic Tech"], stage: "Prototype", lookingFor: ["Frontend Developer", "Data Engineer", "Urban Planner"], timeAgo: "3d ago" },
  { id: 8, type: "lookingForTeam", title: "Need a Designer for Mental Health Game", description: "Building a game that teaches emotional regulation through gameplay mechanics. The neuroscience is solid, the game design doc is ready, but I need a visual artist who can create a warm, inviting world that feels safe to explore difficult emotions.", image: "🎮", gradient: "linear-gradient(135deg, #F472B6 0%, #FFB84D 100%)", creator: CREATORS[4], likes: 267, comments: 78, saves: 145, tags: ["Games", "Mental Health", "Art", "Wellness"], stage: "Looking for Team", lookingFor: ["Visual Artist", "Sound Designer", "Unity Developer"], timeAgo: "4d ago" }
];

const PROGRAMS = [
  { id: 1, title: "North Star Plan", subtitle: "5-Week Growth Journey", description: "Find your life direction through structured self-discovery workshops. Using Stanford d.school's Life Design methodology.", date: "Mar 15 — Apr 19, 2026", spots: "8 spots left", total: 20, icon: "⭐", gradient: "linear-gradient(135deg, #FFB84D 0%, #FF6B6B 100%)" },
  { id: 2, title: "Future World Lab: 2050", subtitle: "48-Hour Creation Sprint", description: "Imagine and prototype the future. Design interactive experiences exploring three possible 2050 scenarios.", date: "Apr 24 — Apr 26, 2026", spots: "23 spots left", total: 50, icon: "🔮", gradient: "linear-gradient(135deg, #A78BFA 0%, #2D3A8C 100%)" },
  { id: 3, title: "Meta-Create Space", subtitle: "Weekly Creative Sessions", description: "Thematic workshops, roundtable dialogues, and mini-hackathons. A space for deep connection and rapid creation.", date: "Every Saturday", spots: "Open", total: 15, icon: "🌀", gradient: "linear-gradient(135deg, #4ECDC4 0%, #34D399 100%)" },
  { id: 4, title: "Hard Tech Incubation", subtitle: "5-Day Build Sprint", description: "Build mechanical arms, drones, and robots while developing project incubation skills. Hardware meets imagination.", date: "May 10 — May 14, 2026", spots: "12 spots left", total: 30, icon: "🤖", gradient: "linear-gradient(135deg, #FF6B6B 0%, #F472B6 100%)" }
];

const MATCH_RESULTS = [
  { creator: CREATORS[3], score: 94, reasons: ["Strong technical skills complement your design expertise", "Shared interest in developer tools and productivity", "Proven track record of shipping fast — 12 projects completed"], compatibility: { skills: 96, values: 88, availability: 95, track: 92 } },
  { creator: CREATORS[0], score: 87, reasons: ["AI/ML expertise aligns with your project's technical needs", "Creative coding background bridges art and technology", "Strong research skills for experimental features"], compatibility: { skills: 90, values: 85, availability: 82, track: 88 } },
  { creator: CREATORS[4], score: 82, reasons: ["Game design expertise brings unique UX perspective", "Research-driven approach ensures evidence-based decisions", "Psychology background valuable for user behavior design"], compatibility: { skills: 78, values: 88, availability: 75, track: 85 } }
];

const TYPE_CONFIG = {
  idea: { icon: Lightbulb, label: "Idea", color: "#FFB84D" },
  project: { icon: Rocket, label: "Project", color: "#4ECDC4" },
  lookingForTeam: { icon: Handshake, label: "Looking for Team", color: "#FF6B6B" },
  story: { icon: Sparkles, label: "Story", color: "#A78BFA" }
};

const CATEGORIES = ["All", "AI/ML", "EdTech", "Climate", "Games", "DevTools", "Social Impact", "Design", "Health"];
const STAGES = ["All Stages", "Concept", "Prototype", "Beta", "Live", "Looking for Team"];

// Weekly challenges
const WEEKLY_CHALLENGES = [
  { id: 1, title: "Ship Something Small", description: "Build and share a micro-project in under 48 hours. Constraints breed creativity.", xpReward: 200, participants: 142, daysLeft: 3, icon: "🚢", color: "#FF6B6B", active: true },
  { id: 2, title: "Feedback Friday", description: "Give thoughtful feedback on 3 other creators' projects this week.", xpReward: 150, participants: 89, daysLeft: 5, icon: "💬", color: "#4ECDC4", active: true },
  { id: 3, title: "Cross-Pollinate", description: "Collaborate with someone outside your usual skill domain.", xpReward: 300, participants: 56, daysLeft: 5, icon: "🌱", color: "#34D399", active: true }
];

// Testimonials
const TESTIMONIALS = [
  { name: "KC", role: "Student, Peking University", text: "I came with a half-baked idea for a learning app. Within 48 hours of the Future World Lab, I had a team, a prototype, and more clarity than months of thinking alone gave me.", avatar: "YT", color: "#A78BFA" },
  { name: "Jk", role: "Designer", text: "The AI matching connected me with an engineer who thinks completely differently from me. That tension is exactly what made our project special.", avatar: "JO", color: "#4ECDC4" },
  { name: "LW", role: "Student, Tsinghua University", text: "Most platforms want your resume. Meta-Create wanted my dreams. That's the difference — and it's why the people here are so different from anywhere else.", avatar: "LW", color: "#FFB84D" }
];

// Creator levels
const LEVEL_NAMES = ["Spark", "Flame", "Creator", "Builder", "Architect", "Visionary", "Legend"];
const LEVEL_THRESHOLDS = [0, 500, 1500, 3000, 5000, 8000, 12000];

function getLevelInfo(xp) {
  let level = 0;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { level = i; break; }
  }
  const currentThreshold = LEVEL_THRESHOLDS[level];
  const nextThreshold = LEVEL_THRESHOLDS[level + 1] || currentThreshold + 2000;
  const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return { level, name: LEVEL_NAMES[level], progress: Math.min(progress, 100), xpToNext: nextThreshold - xp };
}

// ============================================
// COMPONENTS
// ============================================

function Avatar({ name, avatar, color, size = 40, showStreak, streak }) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, ${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: size * 0.35, flexShrink: 0, border: "2px solid rgba(255,255,255,0.2)" }}>
        {avatar}
      </div>
      {showStreak && streak > 0 && (
        <div style={{ position: "absolute", bottom: -2, right: -4, background: "#FF6B6B", borderRadius: 10, padding: "1px 5px", fontSize: 9, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 2, border: "2px solid #0F1729" }}>
          <Flame size={8} />{streak}
        </div>
      )}
    </div>
  );
}

function Badge({ children, color = "#FF6B6B", variant = "filled" }) {
  const styles = variant === "filled"
    ? { background: `${color}20`, color: color, border: `1px solid ${color}30` }
    : { background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.1)" };
  return (
    <span style={{ ...styles, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Stat({ icon: Icon, value, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#94A3B8", fontSize: size }}>
      <Icon size={size} /> {typeof value === "number" ? (value >= 1000 ? `${(value/1000).toFixed(1)}k` : value) : value}
    </span>
  );
}

function GlassCard({ children, style = {}, onClick, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered && hover ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, transition: "all 0.3s ease", cursor: onClick ? "pointer" : "default", transform: hovered && hover && onClick ? "translateY(-2px)" : "none", boxShadow: hovered && hover && onClick ? "0 8px 32px rgba(0,0,0,0.3)" : "none", ...style }}>
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", size = "md", onClick, style = {}, icon: Icon, fullWidth }) {
  const [hovered, setHovered] = useState(false);
  const baseStyles = {
    primary: { background: hovered ? "linear-gradient(135deg, #FF8585, #FFC76B)" : "linear-gradient(135deg, #FF6B6B, #FFB84D)", color: "#fff", border: "none", boxShadow: hovered ? "0 4px 20px rgba(255,107,107,0.4)" : "0 2px 10px rgba(255,107,107,0.2)" },
    secondary: { background: hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)", color: "#E2E8F0", border: "1px solid rgba(255,255,255,0.15)" },
    ghost: { background: hovered ? "rgba(255,255,255,0.06)" : "transparent", color: "#94A3B8", border: "none" }
  };
  const sizeStyles = { sm: { padding: "6px 14px", fontSize: 13 }, md: { padding: "10px 16px", fontSize: 14 }, lg: { padding: "14px 28px", fontSize: 16 } };
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ ...baseStyles[variant], ...sizeStyles[size], borderRadius: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", transition: "all 0.3s ease", fontFamily: "inherit", width: fullWidth ? "100%" : "auto", ...style }}>
      {Icon && <Icon size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
}

function PostCard({ post, onClick }) {
  const TypeIcon = TYPE_CONFIG[post.type]?.icon || Lightbulb;
  const typeColor = TYPE_CONFIG[post.type]?.color || "#FFB84D";
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <GlassCard onClick={onClick} style={{ overflow: "hidden", breakInside: "avoid", marginBottom: 16 }}>
      <div style={{ background: post.gradient, padding: "32px 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative" }}>
        <div style={{ position: "absolute", top: 12, left: 12 }}><Badge color={typeColor}><TypeIcon size={12} /> {TYPE_CONFIG[post.type]?.label}</Badge></div>
        {post.stage && post.stage !== "Published" && <div style={{ position: "absolute", top: 12, right: 12 }}><Badge color="#fff" variant="outline">{post.stage}</Badge></div>}
        <span>{post.image}</span>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{post.title}</h3>
        <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {post.tags.slice(0, 3).map(t => <Badge key={t} variant="outline">{t}</Badge>)}
          {post.tags.length > 3 && <Badge variant="outline">+{post.tags.length - 3}</Badge>}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar name={post.creator.name} avatar={post.creator.avatar} color={post.creator.color} size={28} showStreak streak={post.creator.streak} />
            <div>
              <span style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 500 }}>{post.creator.name}</span>
              {post.timeAgo && <div style={{ color: "#475569", fontSize: 10 }}>{post.timeAgo}</div>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <span onClick={e => { e.stopPropagation(); setLiked(!liked); }} style={{ cursor: "pointer" }}><Stat icon={Heart} value={liked ? post.likes + 1 : post.likes} /></span>
            <Stat icon={MessageCircle} value={post.comments} />
            <span onClick={e => { e.stopPropagation(); setSaved(!saved); }} style={{ cursor: "pointer" }}><Stat icon={Bookmark} value={saved ? post.saves + 1 : post.saves} /></span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function MatchCard({ match, onViewProfile }) {
  const c = match.creator;
  return (
    <GlassCard style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar name={c.name} avatar={c.avatar} color={c.color} size={48} showStreak streak={c.streak} />
          <div>
            <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 600 }}>{c.name}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94A3B8", fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={12} /> {c.location}</span>
              <Badge color="#FFB84D">{getLevelInfo(c.xp).name}</Badge>
            </div>
          </div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB84D)", borderRadius: 12, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{match.score}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 500 }}>MATCH</div>
        </div>
      </div>
      <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{c.bio}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {c.skills.slice(0, 4).map(s => <Badge key={s} color="#4ECDC4">{s}</Badge>)}
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 12, marginBottom: 16 }}>
        <div style={{ color: "#CBD5E1", fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Why you match</div>
        {match.reasons.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, color: "#94A3B8", fontSize: 13 }}>
            <Check size={14} style={{ color: "#34D399", flexShrink: 0, marginTop: 2 }} /> {r}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {Object.entries(match.compatibility).map(([key, val]) => (
          <div key={key} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden", marginBottom: 4 }}>
              <div style={{ height: "100%", width: `${val}%`, background: val > 90 ? "#34D399" : val > 80 ? "#FFB84D" : "#94A3B8", borderRadius: 2, transition: "width 1s ease" }} />
            </div>
            <div style={{ color: "#64748B", fontSize: 10, textTransform: "capitalize" }}>{key === "track" ? "Track Record" : key}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="primary" size="sm" icon={UserPlus} fullWidth>Invite to Collaborate</Button>
        <Button variant="secondary" size="sm" onClick={() => onViewProfile(c)} style={{ minWidth: 100 }}>Profile</Button>
      </div>
    </GlassCard>
  );
}

function SkillRadar({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: "#94A3B8", fontSize: 11 }} />
        <Radar dataKey="value" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.15} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// --- XP Progress Bar ---
function XPBar({ xp, compact = false }) {
  const info = getLevelInfo(xp);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Trophy size={compact ? 12 : 14} style={{ color: "#FFB84D" }} />
          <span style={{ color: "#F1F5F9", fontSize: compact ? 12 : 13, fontWeight: 600 }}>{info.name}</span>
          <span style={{ color: "#475569", fontSize: compact ? 10 : 11 }}>Lv.{info.level}</span>
        </div>
        {!compact && <span style={{ color: "#64748B", fontSize: 11 }}>{info.xpToNext} XP to next level</span>}
      </div>
      <div style={{ height: compact ? 3 : 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${info.progress}%`, background: "linear-gradient(90deg, #FFB84D, #FF6B6B)", borderRadius: 2, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

// ============================================
// PAGES
// ============================================

function LandingPage({ onNavigate }) {
  const lang = useLang();
  const stats = [
    { label: t("stat_creators", lang), value: "1000+", Icon: Users },
    { label: t("stat_projects", lang), value: "50+", Icon: Rocket },
    { label: t("stat_matches", lang), value: "200+", Icon: Sparkles },
    { label: t("stat_countries", lang), value: "2+", Icon: Globe }
  ];

  const partners = ["Tsinghua University", "Peking University", "MIT Media Lab", "Stanford d.school", "Y Combinator", "Columbia University"];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ padding: "80px 16px 50px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,107,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(78,205,196,0.08) 0%, transparent 40%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 24, color: "#FF6B6B", fontSize: 13, fontWeight: 500 }}>
            <Sparkles size={14} /> {t("landing_hero_stat_1", lang)}
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, color: "#F8FAFC", lineHeight: 1.15, marginBottom: 20 }}>
            {t("landing_hero_title_1", lang)}<br />
            <span style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB84D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("landing_hero_title_2", lang)}</span>
          </h1>
          <p style={{ fontSize: 18, color: "#94A3B8", lineHeight: 1.6, maxWidth: 560, margin: "0 auto 32px" }}>
            {t("landing_hero_subtitle", lang)}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <Button size="lg" onClick={() => onNavigate("feed")}>{t("landing_hero_cta_1", lang)}</Button>
            <Button variant="secondary" size="lg" icon={Sparkles} onClick={() => onNavigate("match")}>{t("landing_hero_cta_2", lang)}</Button>
          </div>

          {/* Live Activity Pulse */}
          <GlassCard style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 16px" }} hover={false}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D399", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#94A3B8", fontSize: 13 }}>
              <strong style={{ color: "#F1F5F9" }}>{t("landing_live_stat_1", lang)}</strong> {t("landing_live_stat_2", lang)} — <strong style={{ color: "#FFB84D" }}>{t("landing_live_stat_3", lang)}</strong> {t("landing_live_stat_4", lang)}
            </span>
          </GlassCard>
          <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
        </div>
      </div>

      {/* Partner Logos */}
      <div style={{ padding: "16px 16px 40px", textAlign: "center" }}>
        <p style={{ color: "#475569", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{t("landing_trusted_by", lang)}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", opacity: 0.6 }}>
          {partners.map(p => (
            <span key={p} style={{ color: "#64748B", fontSize: 13, fontWeight: 600, padding: "6px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>{p}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "0 16px 50px", flexWrap: "wrap" }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <s.Icon size={20} style={{ color: "#FF6B6B", marginBottom: 8 }} />
            <div style={{ color: "#F1F5F9", fontSize: 28, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: "#64748B", fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 50px" }}>
        <h2 style={{ textAlign: "center", color: "#F1F5F9", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{t("methodology_title", lang)}</h2>
        <p style={{ textAlign: "center", color: "#94A3B8", marginBottom: 40, fontSize: 15 }}>{t("methodology_sub", lang)}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {[
            { step: "01", title: t("step_share", lang), desc: t("step_share_desc", lang), Icon: Lightbulb, color: "#FFB84D" },
            { step: "02", title: t("step_match", lang), desc: t("step_match_desc", lang), Icon: Sparkles, color: "#FF6B6B" },
            { step: "03", title: t("step_connect", lang), desc: t("step_connect_desc", lang), Icon: Users, color: "#4ECDC4" },
            { step: "04", title: t("step_create", lang), desc: t("step_create_desc", lang), Icon: Rocket, color: "#A78BFA" }
          ].map(s => (
            <GlassCard key={s.step} style={{ padding: 24, textAlign: "center" }} hover={false}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <s.Icon size={22} style={{ color: s.color }} />
              </div>
              <div style={{ color: s.color, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{s.step}</div>
              <h3 style={{ color: "#F1F5F9", fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{s.title}</h3>
              <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.5 }}>{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Weekly Challenge Banner */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 50px" }}>
        <GlassCard style={{ padding: 24, background: "linear-gradient(135deg, rgba(255,107,107,0.08) 0%, rgba(167,139,250,0.08) 100%)", borderColor: "rgba(255,107,107,0.15)" }} hover={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,107,107,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Flame size={22} style={{ color: "#FF6B6B" }} />
            </div>
            <div>
              <h3 style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 700 }}>This Week's Challenge</h3>
              <p style={{ color: "#94A3B8", fontSize: 13 }}>Join 142 creators already participating</p>
            </div>
            <Badge color="#FF6B6B" variant="filled" style={{ marginLeft: "auto" }}>3 days left</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>🚢</span>
            <div>
              <h4 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Ship Something Small</h4>
              <p style={{ color: "#94A3B8", fontSize: 14 }}>Build and share a micro-project in under 48 hours. Constraints breed creativity. Earn 200 XP.</p>
            </div>
          </div>
          <Button icon={Zap} onClick={() => onNavigate("community")}>Join This Challenge</Button>
        </GlassCard>
      </div>

      {/* Space Base Challenge Banner */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 50px" }}>
        <GlassCard style={{ padding: 0, overflow: "hidden", background: "linear-gradient(135deg, rgba(45,58,140,0.3) 0%, rgba(15,23,41,0.6) 50%, rgba(167,139,250,0.15) 100%)", borderColor: "rgba(167,139,250,0.2)" }} hover={false}>
          <div style={{ position: "relative", padding: "32px 28px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", pointerEvents: "none" }}>
              {[...Array(20)].map((_, i) => (
                <div key={i} style={{ position: "absolute", width: 2, height: 2, background: "rgba(255,255,255,0.4)", borderRadius: "50%", top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animation: `pulse ${2+Math.random()*3}s infinite` }} />
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Badge color="#A78BFA" variant="filled">Upcoming Event</Badge>
                <Badge color="#FFB84D" variant="filled">72-Hour Hackathon</Badge>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 48 }}>🛰️</span>
                <div>
                  <h3 style={{ color: "#F1F5F9", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Space Base Challenge</h3>
                  <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.5 }}>Cross-cultural, cross-disciplinary hackathon. 4 tracks. 3 cities. 72 hours. Ship something real.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
                {[
                  { Icon: MapPin, text: "Beijing · New York" },
                  { Icon: Users, text: "Teams of 2-4 students" },
                  { Icon: Calendar, text: "3-day in-person sprint" }
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, color: "#94A3B8", fontSize: 13 }}>
                    <d.Icon size={14} style={{ color: "#A78BFA" }} />
                    {d.text}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <Button icon={Rocket} onClick={() => onNavigate("collab")}>Explore Challenge</Button>
                <Button variant="secondary" onClick={() => onNavigate("collab")}>View Tracks & Teams</Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 50px" }}>
        <h2 style={{ textAlign: "center", color: "#F1F5F9", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{t("stories_title", lang)}</h2>
        <p style={{ textAlign: "center", color: "#94A3B8", marginBottom: 32, fontSize: 14 }}>{t("stories_sub", lang)}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <GlassCard key={i} style={{ padding: 20 }} hover={false}>
              <Quote size={20} style={{ color: "#FF6B6B", opacity: 0.5, marginBottom: 12 }} />
              <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
                <Avatar name={t.name} avatar={t.avatar} color={t.color} size={32} />
                <div>
                  <div style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ color: "#64748B", fontSize: 11 }}>{t.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Founder Story */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 50px" }}>
        <GlassCard style={{ padding: 0, overflow: "hidden" }} hover={false}>
          <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,184,77,0.05))", padding: "32px 28px" }}>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 auto" }}>
                <Avatar name="Alice" avatar="AC" color="#FF6B6B" size={64} />
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ color: "#FF6B6B", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Our Story</div>
                <h2 style={{ color: "#F8FAFC", fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>
                  "I traveled 50+ countries looking for what makes creators come alive. The answer was always the same: other creators."
                </h2>
                <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                  At 19, I paused my studies at Columbia to travel the world. I wrote to NASA as a teenager and got published. I sat with refugees in camps and founders in incubators. Everywhere, the same pattern: the people who change the world never do it alone.
                </p>
                <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                  Meta-Create exists because the best ideas die in isolation. We're building the place where no creator has to build alone — where your wildest idea finds the perfect team to make it real.
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Badge color="#FFB84D">Columbia University</Badge>
                  <Badge color="#4ECDC4">NASA JPL Researcher</Badge>
                  <Badge color="#A78BFA">ICF Certified Coach</Badge>
                  <Badge color="#34D399">50+ Countries</Badge>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Trending Ideas */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ color: "#F1F5F9", fontSize: 24, fontWeight: 700 }}>{t("trending", lang)}</h2>
          <Button variant="ghost" size="sm" icon={ChevronRight} onClick={() => onNavigate("feed")}>{t("see_all", lang)}</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {POSTS.slice(0, 3).map(p => <PostCard key={p.id} post={p} onClick={() => onNavigate("detail", p)} />)}
        </div>
      </div>

      {/* Active Creators Spotlight */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ color: "#F1F5F9", fontSize: 24, fontWeight: 700 }}>Creator Spotlight</h2>
          <Button variant="ghost" size="sm" icon={ChevronRight} onClick={() => onNavigate("community")}>See All</Button>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
          {CREATORS.map(c => (
            <GlassCard key={c.id} onClick={() => onNavigate("profile", c)} style={{ minWidth: 180, padding: 16, textAlign: "center", flexShrink: 0 }}>
              <Avatar name={c.name} avatar={c.avatar} color={c.color} size={48} showStreak streak={c.streak} />
              <div style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600, marginTop: 10, marginBottom: 2 }}>{c.name}</div>
              <div style={{ color: "#64748B", fontSize: 11, marginBottom: 8 }}>{c.location}</div>
              <XPBar xp={c.xp} compact />
              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 10 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 700 }}>{c.projects}</div>
                  <div style={{ color: "#475569", fontSize: 10 }}>Projects</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}><Flame size={10} style={{ color: "#FF6B6B" }} />{c.streak}</div>
                  <div style={{ color: "#475569", fontSize: 10 }}>Streak</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "20px 16px 80px" }}>
        <GlassCard style={{ maxWidth: 640, margin: "0 auto", padding: "40px 32px", background: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(255,184,77,0.08))" }} hover={false}>
          <h2 style={{ color: "#F1F5F9", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Your idea deserves a team.</h2>
          <p style={{ color: "#94A3B8", fontSize: 15, marginBottom: 24 }}>Join 2,400+ creators who stopped waiting for permission and started building. It takes 30 seconds.</p>
          <Button size="lg" onClick={() => onNavigate("create")}>Share Your First Idea</Button>
        </GlassCard>
      </div>
    </div>
  );
}

// --- Community / Engagement Hub ---
function CommunityPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("challenges");
  const leaderboard = [...CREATORS].sort((a, b) => b.xp - a.xp);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ color: "#F8FAFC", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Creator Community</h1>
        <p style={{ color: "#94A3B8", fontSize: 15 }}>Challenges, streaks, and your creator journey</p>
      </div>

      {/* My Status Card */}
      <GlassCard style={{ padding: 20, marginBottom: 24, background: "linear-gradient(135deg, rgba(255,107,107,0.06), rgba(255,184,77,0.06))" }} hover={false}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <Avatar name="You" avatar="AC" color="#FF6B6B" size={52} showStreak streak={14} />
          <div style={{ flex: 1 }}>
            <div style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 700 }}>Your Creator Journey</div>
            <XPBar xp={2800} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { label: "Streak", value: "14 days", Icon: Flame, color: "#FF6B6B" },
            { label: "Ideas Shared", value: "8", Icon: Lightbulb, color: "#FFB84D" },
            { label: "Collabs", value: "3", Icon: Handshake, color: "#4ECDC4" },
            { label: "XP This Week", value: "+450", Icon: Zap, color: "#A78BFA" }
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <s.Icon size={16} style={{ color: s.color, marginBottom: 4 }} />
              <div style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: "#64748B", fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 4 }}>
        {[
          { key: "challenges", label: "Challenges", Icon: Flame },
          { key: "leaderboard", label: "Leaderboard", Icon: Trophy },
          { key: "highlights", label: "This Week", Icon: Star }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: "none", background: activeTab === tab.key ? "rgba(255,107,107,0.12)" : "transparent", color: activeTab === tab.key ? "#FF6B6B" : "#64748B", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
            <tab.Icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Challenges Tab */}
      {activeTab === "challenges" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {WEEKLY_CHALLENGES.map(ch => (
            <GlassCard key={ch.id} style={{ padding: 20 }} hover={false}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: 36 }}>{ch.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 600 }}>{ch.title}</h3>
                    <Badge color={ch.color}>{ch.daysLeft}d left</Badge>
                  </div>
                  <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{ch.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                    <span style={{ color: "#FFB84D", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Zap size={14} /> +{ch.xpReward} XP</span>
                    <span style={{ color: "#64748B", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Users size={12} /> {ch.participants} participating</span>
                  </div>
                  <Button size="sm" icon={Flame}>Join Challenge</Button>
                </div>
              </div>
            </GlassCard>
          ))}

          {/* Past Challenges */}
          <div style={{ marginTop: 16 }}>
            <h3 style={{ color: "#94A3B8", fontSize: 14, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Completed Challenges</h3>
            {[
              { title: "Napkin Sketch Sprint", participants: 203, emoji: "✏️", winner: "Leo Park" },
              { title: "Teach Something New", participants: 167, emoji: "📚", winner: "Aria Santos" },
              { title: "Remix & Reimagine", participants: 189, emoji: "🔄", winner: "Kai Nakamura" }
            ].map((ch, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 24 }}>{ch.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 500 }}>{ch.title}</div>
                  <div style={{ color: "#475569", fontSize: 11 }}>{ch.participants} participated</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#FFB84D", fontSize: 11, fontWeight: 500 }}>Winner</div>
                  <div style={{ color: "#94A3B8", fontSize: 12 }}>{ch.winner}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === "leaderboard" && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {leaderboard.map((c, i) => (
              <GlassCard key={c.id} onClick={() => onNavigate("profile", c)} style={{ padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 28, textAlign: "center", fontWeight: 700, fontSize: i < 3 ? 18 : 14, color: i === 0 ? "#FFB84D" : i === 1 ? "#CBD5E1" : i === 2 ? "#CD7F32" : "#64748B" }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </div>
                  <Avatar name={c.name} avatar={c.avatar} color={c.color} size={40} showStreak streak={c.streak} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                    <div style={{ color: "#64748B", fontSize: 12 }}>{getLevelInfo(c.xp).name} — {c.location}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#FFB84D", fontSize: 16, fontWeight: 700 }}>{c.xp.toLocaleString()}</div>
                    <div style={{ color: "#475569", fontSize: 10 }}>XP</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Highlights Tab */}
      {activeTab === "highlights" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlassCard style={{ padding: 20 }} hover={false}>
            <div style={{ color: "#FFB84D", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Highlight of the Week</div>
            <h3 style={{ color: "#F1F5F9", fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Kai + Maya = MindMap v2</h3>
            <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>After matching with 94% compatibility last month, Kai and Maya shipped MindMap v2 — an AI-powered collaboration canvas now used by 200+ teams. From strangers to co-founders in 6 weeks.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Avatar name="Kai" avatar="KN" color="#A78BFA" size={28} />
              <Avatar name="Maya" avatar="MC" color="#FF6B6B" size={28} />
            </div>
          </GlassCard>

          <h3 style={{ color: "#94A3B8", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Community Milestones</h3>
          {[
            { text: "River Zhang hit a 33-day creation streak", emoji: "🔥", time: "Today" },
            { text: "5 new projects launched from last week's challenge", emoji: "🚀", time: "Yesterday" },
            { text: "Zara's Empathy Engine reached 400+ saves", emoji: "💜", time: "2 days ago" },
            { text: "New record: 42 creators online simultaneously", emoji: "🎉", time: "3 days ago" },
            { text: "Aria found her technical co-founder through AI Match", emoji: "🤝", time: "This week" }
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: 20 }}>{m.emoji}</span>
              <span style={{ color: "#CBD5E1", fontSize: 13, flex: 1 }}>{m.text}</span>
              <span style={{ color: "#475569", fontSize: 11, whiteSpace: "nowrap" }}>{m.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Immersive Feed Card (TikTok / RedBook style) ---
function ImmersiveCard({ post, onClick, onNavigate }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const TypeIcon = TYPE_CONFIG[post.type]?.icon || Lightbulb;
  const typeColor = TYPE_CONFIG[post.type]?.color || "#FFB84D";

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", borderRadius: 20, overflow: "hidden", cursor: "pointer", scrollSnapAlign: "start", flexShrink: 0 }} onClick={onClick}>
      {/* Full background gradient */}
      <div style={{ position: "absolute", inset: 0, background: post.gradient }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 40%, transparent 60%)" }} />

      {/* Center emoji */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 80, filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))" }}>{post.image}</div>

      {/* Top badges */}
      <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
        <Badge color={typeColor}><TypeIcon size={11} /> {TYPE_CONFIG[post.type]?.label}</Badge>
        {post.stage && post.stage !== "Published" && <Badge color="#fff" variant="outline">{post.stage}</Badge>}
      </div>

      {/* Right side action buttons (TikTok style) */}
      <div style={{ position: "absolute", right: 12, bottom: 140, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <div onClick={e => { e.stopPropagation(); onNavigate("profile", post.creator); }} style={{ textAlign: "center" }}>
          <Avatar name={post.creator.name} avatar={post.creator.avatar} color={post.creator.color} size={44} showStreak streak={post.creator.streak} />
        </div>
        <div onClick={e => { e.stopPropagation(); setLiked(!liked); }} style={{ textAlign: "center", cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={20} fill={liked ? "#FF6B6B" : "none"} style={{ color: liked ? "#FF6B6B" : "#fff" }} />
          </div>
          <div style={{ color: "#fff", fontSize: 11, marginTop: 4, fontWeight: 600 }}>{liked ? post.likes + 1 : post.likes}</div>
        </div>
        <div onClick={e => { e.stopPropagation(); }} style={{ textAlign: "center", cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MessageCircle size={20} style={{ color: "#fff" }} />
          </div>
          <div style={{ color: "#fff", fontSize: 11, marginTop: 4, fontWeight: 600 }}>{post.comments}</div>
        </div>
        <div onClick={e => { e.stopPropagation(); setSaved(!saved); }} style={{ textAlign: "center", cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bookmark size={20} fill={saved ? "#FFB84D" : "none"} style={{ color: saved ? "#FFB84D" : "#fff" }} />
          </div>
          <div style={{ color: "#fff", fontSize: 11, marginTop: 4, fontWeight: 600 }}>{saved ? post.saves + 1 : post.saves}</div>
        </div>
        <div onClick={e => { e.stopPropagation(); }} style={{ textAlign: "center", cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Share2 size={20} style={{ color: "#fff" }} />
          </div>
        </div>
      </div>

      {/* Bottom content overlay */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 60, padding: "20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{post.creator.name}</span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{post.timeAgo}</span>
        </div>
        <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>{post.title}</h3>
        <p onClick={e => { e.stopPropagation(); setExpanded(!expanded); }} style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.5, display: expanded ? "block" : "-webkit-box", WebkitLineClamp: expanded ? "none" : 2, WebkitBoxOrient: "vertical", overflow: expanded ? "visible" : "hidden", cursor: "pointer" }}>
          {post.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {post.tags.slice(0, 4).map(t => (
            <span key={t} style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 500 }}>#{t}</span>
          ))}
        </div>
        {post.lookingFor.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <Button size="sm" icon={UserPlus} style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)" }}>
              Join — {post.lookingFor[0]}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Feed Page (TikTok / RedBook hybrid) ---
function FeedPage({ onNavigate }) {
  const [viewMode, setViewMode] = useState("immersive"); // "immersive" or "grid"
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = POSTS.filter(p => {
    if (category !== "All" && !p.tags.some(t => t.toLowerCase().includes(category.toLowerCase().replace("/", "")))) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: viewMode === "immersive" ? 480 : 960, margin: "0 auto", padding: viewMode === "immersive" ? "12px 12px" : "24px 16px", transition: "max-width 0.3s" }}>
      {/* Top bar */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748B" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", padding: "8px 12px 8px 36px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#F1F5F9", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
        </div>
        {/* View toggle */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <button onClick={() => setViewMode("immersive")} style={{ padding: "6px 10px", background: viewMode === "immersive" ? "rgba(255,107,107,0.15)" : "transparent", border: "none", color: viewMode === "immersive" ? "#FF6B6B" : "#64748B", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <Play size={14} />
          </button>
          <button onClick={() => setViewMode("grid")} style={{ padding: "6px 10px", background: viewMode === "grid" ? "rgba(255,107,107,0.15)" : "transparent", border: "none", color: viewMode === "grid" ? "#FF6B6B" : "#64748B", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <Grid3X3 size={14} />
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid", borderColor: category === c ? "#FF6B6B" : "rgba(255,255,255,0.08)", background: category === c ? "rgba(255,107,107,0.15)" : "rgba(255,255,255,0.03)", color: category === c ? "#FF6B6B" : "#94A3B8", fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", transition: "all 0.2s" }}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 16px", color: "#64748B" }}>
          <Search size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p style={{ fontSize: 16 }}>No results found. Try different filters!</p>
        </div>
      ) : viewMode === "immersive" ? (
        /* Immersive TikTok/RedBook vertical scroll */
        <div style={{ display: "flex", flexDirection: "column", gap: 16, scrollSnapType: "y mandatory" }}>
          {filtered.map(p => <ImmersiveCard key={p.id} post={p} onClick={() => onNavigate("detail", p)} onNavigate={onNavigate} />)}
        </div>
      ) : (
        /* Grid view (RedBook style) */
        <div style={{ columnCount: 2, columnGap: 12, columnFill: "balance" }}>
          {filtered.map(p => <PostCard key={p.id} post={p} onClick={() => onNavigate("detail", p)} />)}
        </div>
      )}
    </div>
  );
}

// --- Detail Page ---
function DetailPage({ post, onNavigate, onBack }) {
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!post) return null;
  const TypeIcon = TYPE_CONFIG[post.type]?.icon || Lightbulb;
  const typeColor = TYPE_CONFIG[post.type]?.color || "#FFB84D";
  const mockComments = [
    { name: "Kai Nakamura", avatar: "KN", color: "#A78BFA", text: "This is brilliant! I've been thinking about something similar. Would love to chat about the technical architecture.", time: "2h ago" },
    { name: "Zara Okonkwo", avatar: "ZO", color: "#F472B6", text: "The neuroscience angle here is fascinating. Have you looked into spaced repetition combined with musical patterns?", time: "5h ago" },
    { name: "River Zhang", avatar: "RZ", color: "#34D399", text: "Count me in if you need help with data modeling. This could scale beautifully.", time: "1d ago" }
  ];

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: "#94A3B8", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontFamily: "inherit", marginBottom: 20, padding: 0 }}><ArrowLeft size={16} /> Back</button>
      <div style={{ background: post.gradient, borderRadius: 20, padding: "48px 24px", textAlign: "center", fontSize: 72, marginBottom: 24, position: "relative" }}>
        <div style={{ position: "absolute", top: 16, left: 16 }}><Badge color={typeColor}><TypeIcon size={12} /> {TYPE_CONFIG[post.type]?.label}</Badge></div>
        {post.stage && <div style={{ position: "absolute", top: 16, right: 16 }}><Badge color="#fff">{post.stage}</Badge></div>}
        <span>{post.image}</span>
      </div>
      <h1 style={{ color: "#F8FAFC", fontSize: 28, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>{post.title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div onClick={() => onNavigate("profile", post.creator)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <Avatar name={post.creator.name} avatar={post.creator.avatar} color={post.creator.color} size={36} showStreak streak={post.creator.streak} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#E2E8F0", fontSize: 14, fontWeight: 600 }}>{post.creator.name}</span>
              <Badge color="#FFB84D">{getLevelInfo(post.creator.xp).name}</Badge>
            </div>
            <div style={{ color: "#64748B", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} />{post.creator.location} · {post.timeAgo}</div>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
          <span onClick={() => setLiked(!liked)} style={{ cursor: "pointer" }}><Stat icon={Heart} value={liked ? post.likes + 1 : post.likes} size={16} /></span>
          <Stat icon={MessageCircle} value={post.comments} size={16} />
          <span onClick={() => setSaved(!saved)} style={{ cursor: "pointer" }}><Stat icon={Bookmark} value={saved ? post.saves + 1 : post.saves} size={16} /></span>
          <Stat icon={Share2} value="Share" size={16} />
        </div>
      </div>
      <GlassCard style={{ padding: 20, marginBottom: 20 }} hover={false}>
        <p style={{ color: "#CBD5E1", fontSize: 15, lineHeight: 1.7 }}>{post.description}</p>
      </GlassCard>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {post.tags.map(t => <Badge key={t} color="#4ECDC4">{t}</Badge>)}
      </div>
      {post.lookingFor.length > 0 && (
        <GlassCard style={{ padding: 20, marginBottom: 20, borderColor: "rgba(255,107,107,0.2)" }} hover={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><Handshake size={16} style={{ color: "#FF6B6B" }} /><span style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600 }}>Looking For</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{post.lookingFor.map(r => <Badge key={r} color="#FF6B6B">{r}</Badge>)}</div>
          <Button variant="primary" size="md" icon={UserPlus} style={{ marginTop: 16 }} fullWidth>I'm Interested — Let's Collaborate</Button>
        </GlassCard>
      )}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Discussion ({mockComments.length})</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Share your thoughts..." style={{ flex: 1, padding: "10px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
          <Button variant="primary" size="md" icon={Send}>Send</Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mockComments.map((c, i) => (
            <GlassCard key={i} style={{ padding: 16 }} hover={false}>
              <div style={{ display: "flex", gap: 10 }}>
                <Avatar name={c.name} avatar={c.avatar} color={c.color} size={32} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600 }}>{c.name}</span>
                    <span style={{ color: "#64748B", fontSize: 11 }}>{c.time}</span>
                  </div>
                  <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.5 }}>{c.text}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Profile Page ---
function ProfilePage({ creator, onBack, onNavigate }) {
  if (!creator) return null;
  const creatorPosts = POSTS.filter(p => p.creator.id === creator.id);
  const levelInfo = getLevelInfo(creator.xp);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: "#94A3B8", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontFamily: "inherit", marginBottom: 20, padding: 0 }}><ArrowLeft size={16} /> Back</button>
      <GlassCard style={{ padding: 24, marginBottom: 20, textAlign: "center" }} hover={false}>
        <Avatar name={creator.name} avatar={creator.avatar} color={creator.color} size={72} showStreak streak={creator.streak} />
        <h1 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700, marginTop: 12, marginBottom: 4 }}>{creator.name}</h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ color: "#94A3B8", fontSize: 14, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={14} /> {creator.location}</span>
          <Badge color="#FFB84D">{levelInfo.name}</Badge>
        </div>
        <p style={{ color: "#CBD5E1", fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 16px" }}>{creator.bio}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700 }}>{creator.projects}</div>
            <div style={{ color: "#64748B", fontSize: 12 }}>Projects</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700 }}>{creator.collaborations}</div>
            <div style={{ color: "#64748B", fontSize: 12 }}>Collabs</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><Flame size={16} style={{ color: "#FF6B6B" }} />{creator.streak}</div>
            <div style={{ color: "#64748B", fontSize: 12 }}>Day Streak</div>
          </div>
        </div>
        <XPBar xp={creator.xp} />
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          <Button variant="primary" icon={UserPlus}>Connect</Button>
          <Button variant="secondary" icon={MessageCircle}>Message</Button>
        </div>
      </GlassCard>
      <GlassCard style={{ padding: 20, marginBottom: 20 }} hover={false}>
        <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Creator DNA</h3>
        <p style={{ color: "#64748B", fontSize: 12, marginBottom: 8 }}>Skill & capability profile</p>
        <SkillRadar data={creator.skillData} />
      </GlassCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <GlassCard style={{ padding: 16 }} hover={false}>
          <h4 style={{ color: "#F1F5F9", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Skills</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{creator.skills.map(s => <Badge key={s} color="#4ECDC4">{s}</Badge>)}</div>
        </GlassCard>
        <GlassCard style={{ padding: 16 }} hover={false}>
          <h4 style={{ color: "#F1F5F9", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Interests</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{creator.interests.map(i => <Badge key={i} color="#FFB84D">{i}</Badge>)}</div>
        </GlassCard>
      </div>
      <GlassCard style={{ padding: 16, marginBottom: 20 }} hover={false}>
        <h4 style={{ color: "#F1F5F9", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Values</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{creator.values.map(v => <Badge key={v} color="#A78BFA">{v}</Badge>)}</div>
      </GlassCard>
      <GlassCard style={{ padding: 16, marginBottom: 20 }} hover={false}>
        <h4 style={{ color: "#F1F5F9", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Badges</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {creator.badges.map(b => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,184,77,0.1)", border: "1px solid rgba(255,184,77,0.2)", borderRadius: 8, padding: "6px 12px" }}>
              <Award size={14} style={{ color: "#FFB84D" }} />
              <span style={{ color: "#FFB84D", fontSize: 12, fontWeight: 500 }}>{b}</span>
            </div>
          ))}
        </div>
      </GlassCard>
      {creatorPosts.length > 0 && (
        <div>
          <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Posts by {creator.name}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {creatorPosts.map(p => <PostCard key={p.id} post={p} onClick={() => onNavigate("detail", p)} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Match Hub ---
function MatchHubPage({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleMatch = () => { setLoading(true); setTimeout(() => { setLoading(false); setShowResults(true); }, 1800); };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, rgba(255,107,107,0.15), rgba(255,184,77,0.15))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Sparkles size={28} style={{ color: "#FF6B6B" }} /></div>
        <h1 style={{ color: "#F8FAFC", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>AI Match Hub</h1>
        <p style={{ color: "#94A3B8", fontSize: 15 }}>Describe what you're building and we'll find your ideal collaborators</p>
        <p style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>3,200+ successful matches and counting</p>
      </div>
      <GlassCard style={{ padding: 24, marginBottom: 24 }} hover={false}>
        <label style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>What are you building?</label>
        <textarea value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g., An AI-powered platform that helps musicians collaborate remotely with real-time audio synthesis..." rows={3} style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 16 }} />
        <label style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>What skills do you need?</label>
        <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g., Backend engineering, UI design, music production..." style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 20 }} />
        <Button variant="primary" size="lg" icon={Sparkles} fullWidth onClick={handleMatch}>{loading ? "Finding Your Matches..." : "Find My Dream Team"}</Button>
      </GlassCard>
      {loading && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ width: 48, height: 48, border: "3px solid rgba(255,107,107,0.2)", borderTopColor: "#FF6B6B", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "#94A3B8", fontSize: 14 }}>Analyzing 2,400+ creator profiles...</p>
        </div>
      )}
      {showResults && !loading && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Zap size={18} style={{ color: "#FFB84D" }} />
            <h2 style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 600 }}>Top Matches for You</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {MATCH_RESULTS.map((m, i) => <MatchCard key={i} match={m} onViewProfile={c => onNavigate("profile", c)} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Create Post ---
function CreatePostPage({ onNavigate }) {
  const [postType, setPostType] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [step, setStep] = useState(1);
  const [published, setPublished] = useState(false);
  const addTag = () => { if (tagInput.trim() && tags.length < 6) { setTags([...tags, tagInput.trim()]); setTagInput(""); } };

  if (published) {
    return (
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "80px 16px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #34D399, #4ECDC4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><Check size={36} style={{ color: "#fff" }} /></div>
        <h1 style={{ color: "#F8FAFC", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Published!</h1>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,184,77,0.1)", border: "1px solid rgba(255,184,77,0.2)", borderRadius: 8, padding: "6px 12px", marginBottom: 16 }}><Zap size={14} style={{ color: "#FFB84D" }} /><span style={{ color: "#FFB84D", fontSize: 13, fontWeight: 600 }}>+50 XP earned!</span></div>
        <p style={{ color: "#94A3B8", fontSize: 15, marginBottom: 32 }}>Your post is live. We're already looking for matching collaborators to notify.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Button onClick={() => onNavigate("feed")}>View in Feed</Button>
          <Button variant="secondary" onClick={() => { setPublished(false); setStep(1); setPostType(null); setTitle(""); setDescription(""); setTags([]); }}>Create Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Create a Post</h1>
      <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 24 }}>Share your idea with the world — earn XP and find collaborators</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {[1, 2, 3].map(s => (<div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? "linear-gradient(135deg, #FF6B6B, #FFB84D)" : "rgba(255,255,255,0.06)", transition: "all 0.3s" }} />))}
      </div>
      {step === 1 && (
        <div>
          <h2 style={{ color: "#E2E8F0", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>What are you sharing?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {Object.entries(TYPE_CONFIG).map(([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <GlassCard key={key} onClick={() => { setPostType(key); setStep(2); }} style={{ padding: 20, textAlign: "center", borderColor: postType === key ? cfg.color : undefined, cursor: "pointer" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cfg.color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}><Icon size={22} style={{ color: cfg.color }} /></div>
                  <div style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{cfg.label}</div>
                  <div style={{ color: "#64748B", fontSize: 12 }}>
                    {key === "idea" && "A raw concept or inspiration"}
                    {key === "project" && "An active project with updates"}
                    {key === "lookingForTeam" && "Find collaborators"}
                    {key === "story" && "Personal reflection or lesson"}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 style={{ color: "#E2E8F0", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Tell us more</h2>
          <GlassCard style={{ padding: 20 }} hover={false}>
            <label style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Give your post a compelling title..." style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#F1F5F9", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 16 }} />
            <label style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your idea, what problem it solves, and what makes it exciting..." rows={6} style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 16 }} />
            <label style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Tags (up to 6)</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTag()} placeholder="Add a tag..." style={{ flex: 1, padding: "8px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#F1F5F9", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
              <Button variant="secondary" size="sm" onClick={addTag}>Add</Button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {tags.map((t, i) => (<Badge key={i} color="#4ECDC4">{t} <X size={10} style={{ cursor: "pointer", marginLeft: 4 }} onClick={() => setTags(tags.filter((_, j) => j !== i))} /></Badge>))}
            </div>
          </GlassCard>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button fullWidth onClick={() => setStep(3)} style={{ opacity: title && description ? 1 : 0.5 }}>Preview</Button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 style={{ color: "#E2E8F0", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Preview Your Post</h2>
          <GlassCard style={{ overflow: "hidden", marginBottom: 20 }} hover={false}>
            <div style={{ background: `linear-gradient(135deg, ${TYPE_CONFIG[postType]?.color || "#FF6B6B"}, #2D3A8C)`, padding: "32px 16px", textAlign: "center" }}><Badge color="#fff">{TYPE_CONFIG[postType]?.label}</Badge></div>
            <div style={{ padding: 16 }}>
              <h3 style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{title || "Untitled"}</h3>
              <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{description || "No description"}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{tags.map((t, i) => <Badge key={i} color="#4ECDC4">{t}</Badge>)}</div>
            </div>
          </GlassCard>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" onClick={() => setStep(2)}>Edit</Button>
            <Button fullWidth icon={Send} onClick={() => setPublished(true)}>Publish (+50 XP)</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Space Base Challenge / Collaboration Page ---
function CollabPage({ onNavigate }) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showApply, setShowApply] = useState(false);

  const tracks = [
    { id: "engineering", title: "Engineering", icon: "🛰️", color: "#4ECDC4", desc: "Build the tech stack for a Mars habitat, orbital station, or deep-space probe. Hardware prototypes, software simulations, robotics — make it work.", skills: ["Robotics", "Embedded Systems", "3D Printing", "Python", "CAD"], projects: "Habitat life-support systems, rover prototypes, space communication relays" },
    { id: "society", title: "Society", icon: "🌍", color: "#FFB84D", desc: "Design governance, economics, and social systems for space communities. How do humans organize, resolve conflict, and thrive beyond Earth?", skills: ["Policy Design", "Economics", "Game Theory", "Sociology", "Writing"], projects: "Space colony constitutions, resource allocation games, migration simulations" },
    { id: "aesthetics", title: "Aesthetics", icon: "🎨", color: "#F472B6", desc: "Create the art, music, architecture, and experiences of space civilization. What does beauty look like at zero gravity?", skills: ["3D Art", "Sound Design", "VR/AR", "Architecture", "Film"], projects: "Zero-G music instruments, orbital architecture, space documentary films" },
    { id: "open", title: "Open Innovation", icon: "🔮", color: "#A78BFA", desc: "Wild cards welcome. Combine disciplines, break rules, invent entirely new categories. The only constraint is: it must be real.", skills: ["Cross-Disciplinary", "Creative Coding", "Bio-Art", "Philosophy", "Anything"], projects: "Space food culture, asteroid mining ethics games, cosmic consciousness VR" }
  ];

  const timeline = [
    { phase: "Pre-Match", date: "Week 1 (Online)", desc: "Form teams of 2–4 via AI matching. Choose your track. Meet your teammates virtually.", icon: "🤝", active: true },
    { phase: "Day 0", date: "Kickoff Night", desc: "Opening ceremony across 3 sites simultaneously. Challenge brief revealed. Build begins.", icon: "🚀", active: false },
    { phase: "Day 1", date: "Deep Build", desc: "Heads-down creation. Mentor office hours. Mid-point check-ins.", icon: "🔨", active: false },
    { phase: "Day 2", date: "Integration", desc: "Prototype refinement. Cross-team feedback sessions. Pitch preparation.", icon: "⚡", active: false },
    { phase: "Day 3", date: "Demo Day", desc: "5-minute pitches. Live demos. Judges panel. Awards ceremony across all 3 sites.", icon: "🏆", active: false }
  ];

  const sites = [
    { city: "Beijing", venue: "Peking University", emoji: "🇨🇳", teams: 8 },
    { city: "New York", venue: "Columbia University", emoji: "🇺🇸", teams: 5 }
  ];

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "40px 16px 32px", position: "relative", overflow: "hidden", borderRadius: 24, marginBottom: 24, background: "linear-gradient(135deg, #0a0e27 0%, #1a1040 40%, #0d1f3c 100%)" }}>
        {/* Star field effect */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.4, background: "radial-gradient(1px 1px at 10% 20%, #fff, transparent), radial-gradient(1px 1px at 30% 60%, #fff, transparent), radial-gradient(1.5px 1.5px at 50% 10%, #FFB84D, transparent), radial-gradient(1px 1px at 70% 40%, #fff, transparent), radial-gradient(1px 1px at 90% 80%, #fff, transparent), radial-gradient(1.5px 1.5px at 15% 85%, #4ECDC4, transparent), radial-gradient(1px 1px at 60% 70%, #fff, transparent), radial-gradient(1px 1px at 80% 15%, #fff, transparent), radial-gradient(2px 2px at 40% 45%, #FF6B6B, transparent), radial-gradient(1px 1px at 25% 35%, #fff, transparent), radial-gradient(1px 1px at 55% 90%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 55%, #A78BFA, transparent)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🚀</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,107,107,0.15)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 16, color: "#FF6B6B", fontSize: 12, fontWeight: 600 }}>
            <Flame size={12} /> Applications Open — 28 Teams, 3 Cities
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: "#F8FAFC", lineHeight: 1.15, marginBottom: 12 }}>
            Space Base<br />
            <span style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB84D, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Challenge</span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.6, maxWidth: 500, margin: "0 auto 20px" }}>
            72 hours. 3 cities. 1 mission: Design humanity's future beyond Earth. A cross-cultural, cross-disciplinary creative hackathon where every team ships something real.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button size="lg" icon={Rocket} onClick={() => setShowApply(true)}>Apply Now</Button>
            <Button variant="secondary" size="lg" icon={Users} onClick={() => onNavigate("match")}>Find Teammates</Button>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Duration", value: "72 hrs", Icon: Clock, color: "#FF6B6B" },
          { label: "Team Size", value: "2–4", Icon: Users, color: "#4ECDC4" },
          { label: "Cities", value: "3", Icon: Globe, color: "#FFB84D" },
          { label: "Output", value: "Prototype", Icon: Rocket, color: "#A78BFA" }
        ].map(s => (
          <GlassCard key={s.label} style={{ padding: 14, textAlign: "center" }} hover={false}>
            <s.Icon size={18} style={{ color: s.color, marginBottom: 6 }} />
            <div style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: "#64748B", fontSize: 11 }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Format */}
      <GlassCard style={{ padding: 20, marginBottom: 24, borderColor: "rgba(78,205,196,0.2)" }} hover={false}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Calendar size={16} style={{ color: "#4ECDC4" }} />
          <span style={{ color: "#F1F5F9", fontSize: 15, fontWeight: 600 }}>How It Works</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", color: "#94A3B8", fontSize: 14, lineHeight: 1.6 }}>
          <Badge color="#4ECDC4">1 week online pre-match</Badge>
          <ArrowRight size={14} style={{ color: "#475569" }} />
          <Badge color="#FF6B6B">3-day in-person hackathon</Badge>
          <ArrowRight size={14} style={{ color: "#475569" }} />
          <Badge color="#FFB84D">Working prototype + 5-min pitch</Badge>
        </div>
        <p style={{ color: "#64748B", fontSize: 13, marginTop: 12 }}>This is not a lecture series or a panel discussion. Every participant ships something real.</p>
      </GlassCard>

      {/* 4 Tracks */}
      <h2 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Choose Your Track</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {tracks.map(t => (
          <GlassCard key={t.id} onClick={() => setSelectedTrack(selectedTrack === t.id ? null : t.id)}
            style={{ padding: 0, overflow: "hidden", borderColor: selectedTrack === t.id ? t.color : undefined, transition: "all 0.3s" }}>
            <div style={{ background: `linear-gradient(135deg, ${t.color}15, ${t.color}05)`, padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 32 }}>{t.icon}</span>
                {selectedTrack === t.id && <Check size={16} style={{ color: t.color }} />}
              </div>
              <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>{t.title}</h3>
              <p style={{ color: "#94A3B8", fontSize: 12, lineHeight: 1.5 }}>{t.desc}</p>
            </div>
            {selectedTrack === t.id && (
              <div style={{ padding: "12px 16px", borderTop: `1px solid ${t.color}20` }}>
                <div style={{ color: "#CBD5E1", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Skills Needed</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                  {t.skills.map(s => <Badge key={s} color={t.color}>{s}</Badge>)}
                </div>
                <div style={{ color: "#CBD5E1", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Example Projects</div>
                <p style={{ color: "#94A3B8", fontSize: 12, lineHeight: 1.5 }}>{t.projects}</p>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Timeline */}
      <h2 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Timeline</h2>
      <div style={{ marginBottom: 24 }}>
        {timeline.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < timeline.length - 1 ? 0 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: t.active ? "linear-gradient(135deg, #FF6B6B, #FFB84D)" : "rgba(255,255,255,0.06)", border: t.active ? "none" : "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{t.icon}</div>
              {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 40, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />}
            </div>
            <div style={{ paddingBottom: 20, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600 }}>{t.phase}</span>
                <span style={{ color: "#64748B", fontSize: 12 }}>{t.date}</span>
                {t.active && <Badge color="#34D399">Current</Badge>}
              </div>
              <p style={{ color: "#94A3B8", fontSize: 13 }}>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sites */}
      <h2 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>3 Cities, Simultaneously</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {sites.map(s => (
          <GlassCard key={s.city} style={{ padding: 16, textAlign: "center" }} hover={false}>
            <span style={{ fontSize: 28 }}>{s.emoji}</span>
            <div style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 700, marginTop: 8 }}>{s.city}</div>
            <div style={{ color: "#64748B", fontSize: 11, marginBottom: 8 }}>{s.venue}</div>
            <Badge color="#4ECDC4">{s.teams} teams</Badge>
          </GlassCard>
        ))}
      </div>

      {/* Teams forming now */}
      <h2 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Teams Forming Now</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {[
          { name: "Orbital Architects", track: "Engineering", members: [CREATORS[3], CREATORS[0]], needed: "Mechanical Engineer", spots: 2 },
          { name: "Cosmic Storytellers", track: "Aesthetics", members: [CREATORS[2]], needed: "Visual Artist, Sound Designer", spots: 3 },
          { name: "Mars Gov", track: "Society", members: [CREATORS[4], CREATORS[5]], needed: "Economist", spots: 1 }
        ].map((team, i) => (
          <GlassCard key={i} style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <h4 style={{ color: "#F1F5F9", fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{team.name}</h4>
                <Badge color={tracks.find(t => t.title === team.track)?.color || "#94A3B8"}>{team.track}</Badge>
              </div>
              <Badge color="#FFB84D">{team.spots} spot{team.spots > 1 ? "s" : ""} open</Badge>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ color: "#64748B", fontSize: 12 }}>Members:</span>
              {team.members.map(m => <Avatar key={m.id} name={m.name} avatar={m.avatar} color={m.color} size={28} />)}
              {Array.from({ length: team.spots }).map((_, j) => (
                <div key={j} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Plus size={12} style={{ color: "#475569" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94A3B8", fontSize: 12 }}>Looking for: <strong style={{ color: "#CBD5E1" }}>{team.needed}</strong></span>
              <Button size="sm" variant="primary">Join Team</Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* What You'll Build */}
      <GlassCard style={{ padding: 20, marginBottom: 24, background: "linear-gradient(135deg, rgba(167,139,250,0.06), rgba(255,107,107,0.06))" }} hover={false}>
        <h3 style={{ color: "#F1F5F9", fontSize: 17, fontWeight: 700, marginBottom: 12 }}>What You'll Ship</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Tech Demo", emoji: "💻", desc: "Working hardware or software prototype" },
            { label: "Design System", emoji: "🎨", desc: "Complete visual and interaction framework" },
            { label: "Interactive Narrative", emoji: "📖", desc: "Playable story or experience" },
            { label: "Video / Film", emoji: "🎬", desc: "Short documentary or concept film" }
          ].map(o => (
            <div key={o.label} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 10, background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
              <span style={{ fontSize: 24 }}>{o.emoji}</span>
              <div>
                <div style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600 }}>{o.label}</div>
                <div style={{ color: "#64748B", fontSize: 11 }}>{o.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <GlassCard style={{ padding: "32px 24px", background: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(167,139,250,0.08))" }} hover={false}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌌</div>
          <h2 style={{ color: "#F1F5F9", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Ready to build for the stars?</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 20 }}>28 teams across 3 cities. 72 hours to ship. Your crew is waiting.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Button size="lg" icon={Rocket} onClick={() => setShowApply(true)}>Apply as Individual</Button>
            <Button variant="secondary" size="lg" icon={Users}>Apply as Team</Button>
          </div>
        </GlassCard>
      </div>

      {/* Application Modal */}
      {showApply && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowApply(false)}>
          <GlassCard style={{ maxWidth: 440, width: "100%", padding: 24, background: "rgba(15,23,41,0.95)" }} hover={false} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 700 }}>Apply to Space Base Challenge</h2>
              <X size={20} style={{ color: "#64748B", cursor: "pointer" }} onClick={() => setShowApply(false)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ color: "#CBD5E1", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>Full Name</label>
                <input placeholder="Your name" style={{ width: "100%", padding: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ color: "#CBD5E1", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>Preferred Track</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {tracks.map(t => (
                    <button key={t.id} onClick={() => setSelectedTrack(t.id)} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${selectedTrack === t.id ? t.color : "rgba(255,255,255,0.08)"}`, background: selectedTrack === t.id ? `${t.color}15` : "rgba(255,255,255,0.03)", color: selectedTrack === t.id ? t.color : "#94A3B8", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
                      <span>{t.icon}</span> {t.title}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ color: "#CBD5E1", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>Preferred City</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {sites.map(s => (
                    <button key={s.city} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#94A3B8", fontSize: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "center" }}>
                      <span style={{ display: "block", fontSize: 16 }}>{s.emoji}</span>
                      {s.city}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ color: "#CBD5E1", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>What will you bring to your team?</label>
                <textarea placeholder="Your skills, interests, and what excites you about space..." rows={3} style={{ width: "100%", padding: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#F1F5F9", fontSize: 13, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <Button fullWidth size="lg" icon={Rocket}>Submit Application</Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// --- Programs Page ---
function ProgramsPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ color: "#F8FAFC", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Programs & Events</h1>
        <p style={{ color: "#94A3B8", fontSize: 15 }}>Immersive experiences that accelerate your creative journey</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {PROGRAMS.map(prog => (
          <GlassCard key={prog.id} style={{ overflow: "hidden" }}>
            <div style={{ display: "flex" }}>
              <div style={{ background: prog.gradient, padding: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, minWidth: 100 }}>{prog.icon}</div>
              <div style={{ padding: "16px 16px", flex: 1 }}>
                <h3 style={{ color: "#F1F5F9", fontSize: 17, fontWeight: 600, marginBottom: 2 }}>{prog.title}</h3>
                <p style={{ color: "#FFB84D", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{prog.subtitle}</p>
                <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>{prog.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ color: "#64748B", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {prog.date}</span>
                  <span style={{ color: "#34D399", fontSize: 12, fontWeight: 500 }}>{prog.spots}</span>
                </div>
                <Button size="sm">Apply Now</Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// --- Chat / Messages Page ---
function ChatPage({ onNavigate }) {
  const lang = useLang();
  const [activeChat, setActiveChat] = useState(null);
  const [chatTab, setChatTab] = useState("teams");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: CREATORS[3], text: "Hey! I saw your AI music learning idea — I'd love to help build the real-time audio engine.", time: "10:32 AM", isMe: false },
    { id: 2, sender: null, text: "That would be amazing! I've been stuck on the latency issue. Do you have experience with WebAudio API?", time: "10:34 AM", isMe: true },
    { id: 3, sender: CREATORS[3], text: "Yes! I shipped a real-time audio tool last month. Let me share my approach — we could get sub-20ms latency.", time: "10:35 AM", isMe: false },
    { id: 4, sender: null, text: "Perfect. Let's set up a workspace and start prototyping this weekend?", time: "10:37 AM", isMe: true },
    { id: 5, sender: CREATORS[3], text: "I'm in. I'll create a project board tonight. 🚀", time: "10:38 AM", isMe: false }
  ]);

  const teamChats = [
    { id: "t1", name: "Orbital Architects", members: [CREATORS[3], CREATORS[0]], lastMsg: "Let's finalize the prototype tonight", time: "2m ago", unread: 3, color: "#4ECDC4" },
    { id: "t2", name: "MindMap v2 Team", members: [CREATORS[1], CREATORS[3]], lastMsg: "New design mockups uploaded", time: "1h ago", unread: 0, color: "#A78BFA" }
  ];

  const dmChats = [
    { id: "d1", creator: CREATORS[3], lastMsg: "I'm in. I'll create a project board tonight. 🚀", time: "10:38 AM", unread: 0, online: true },
    { id: "d2", creator: CREATORS[0], lastMsg: "Would love to collaborate on the AI module!", time: "Yesterday", unread: 2, online: true },
    { id: "d3", creator: CREATORS[4], lastMsg: "The neuroscience research is ready to share", time: "2d ago", unread: 0, online: false },
    { id: "d4", creator: CREATORS[2], lastMsg: "Thank you for the feedback on my pitch!", time: "3d ago", unread: 0, online: false }
  ];

  const handleSend = () => {
    if (!messageInput.trim()) return;
    setMessages(prev => [...prev, { id: prev.length + 1, sender: null, text: messageInput, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), isMe: true }]);
    setMessageInput("");
  };

  if (activeChat) {
    const chatPartner = activeChat.creator || { name: activeChat.name, avatar: activeChat.name.split(" ").map(w => w[0]).join(""), color: activeChat.color };
    return (
      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 96px)" }}>
        {/* Chat header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => setActiveChat(null)} style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", padding: 0 }}><ArrowLeft size={18} /></button>
          <Avatar name={chatPartner.name} avatar={chatPartner.avatar} color={chatPartner.color} size={36} />
          <div style={{ flex: 1 }}>
            <div style={{ color: "#F1F5F9", fontSize: 15, fontWeight: 600 }}>{chatPartner.name}</div>
            <div style={{ color: "#34D399", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399" }} />{t("online", lang)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm" style={{ padding: 6 }}><Phone size={16} /></Button>
            <Button variant="ghost" size="sm" style={{ padding: 6 }}><Video size={16} /></Button>
            <Button variant="ghost" size="sm" style={{ padding: 6 }}><MoreHorizontal size={16} /></Button>
          </div>
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: "flex", justifyContent: msg.isMe ? "flex-end" : "flex-start", gap: 8 }}>
              {!msg.isMe && <Avatar name={msg.sender.name} avatar={msg.sender.avatar} color={msg.sender.color} size={28} />}
              <div style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: msg.isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: msg.isMe ? "linear-gradient(135deg, #FF6B6B, #FFB84D)" : "rgba(255,255,255,0.06)", color: msg.isMe ? "#fff" : "#E2E8F0", fontSize: 14, lineHeight: 1.5 }}>
                {msg.text}
                <div style={{ fontSize: 10, marginTop: 4, opacity: 0.7, textAlign: "right" }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8, alignItems: "center" }}>
          <button style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", padding: 4 }}><Paperclip size={18} /></button>
          <button style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", padding: 4 }}><Image size={18} /></button>
          <input value={messageInput} onChange={e => setMessageInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder={t("chat_ph", lang)} style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
          <button onClick={handleSend} style={{ width: 36, height: 36, borderRadius: "50%", background: messageInput.trim() ? "linear-gradient(135deg, #FF6B6B, #FFB84D)" : "rgba(255,255,255,0.06)", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Send size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700 }}>{t("chat_title", lang)}</h1>
        <Button variant="secondary" size="sm" icon={UserPlus} onClick={() => onNavigate("match")}>{t("chat_find", lang)}</Button>
      </div>

      {/* Tab toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 4 }}>
        {[{ key: "teams", label: t("chat_teams", lang), Icon: Users }, { key: "dms", label: t("chat_dms", lang), Icon: MessageCircle }].map(tab => (
          <button key={tab.key} onClick={() => setChatTab(tab.key)}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: "none", background: chatTab === tab.key ? "rgba(255,107,107,0.12)" : "transparent", color: chatTab === tab.key ? "#FF6B6B" : "#64748B", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
            <tab.Icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {chatTab === "teams" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {teamChats.map(chat => (
            <GlassCard key={chat.id} onClick={() => setActiveChat(chat)} style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${chat.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Users size={20} style={{ color: chat.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600 }}>{chat.name}</span>
                    <span style={{ color: "#64748B", fontSize: 11 }}>{chat.time}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#94A3B8", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>{chat.lastMsg}</span>
                    {chat.unread > 0 && <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF6B6B", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{chat.unread}</div>}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: -8, marginTop: 8, paddingLeft: 56 }}>
                {chat.members.map(m => <Avatar key={m.id} name={m.name} avatar={m.avatar} color={m.color} size={24} />)}
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {chatTab === "dms" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {dmChats.map(chat => (
            <GlassCard key={chat.id} onClick={() => setActiveChat(chat)} style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative" }}>
                  <Avatar name={chat.creator.name} avatar={chat.creator.avatar} color={chat.creator.color} size={44} />
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: chat.online ? "#34D399" : "#64748B", border: "2px solid #0F1729" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ color: "#F1F5F9", fontSize: 14, fontWeight: chat.unread > 0 ? 700 : 500 }}>{chat.creator.name}</span>
                    <span style={{ color: "#64748B", fontSize: 11 }}>{chat.time}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: chat.unread > 0 ? "#CBD5E1" : "#64748B", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>{chat.lastMsg}</span>
                    {chat.unread > 0 && <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF6B6B", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{chat.unread}</div>}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Team Workspace Page ---
function WorkspacePage({ onNavigate }) {
  const lang = useLang();
  const [activeWsTab, setActiveWsTab] = useState("tasks");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finalize audio engine architecture", done: true, assignee: CREATORS[3], priority: "high" },
    { id: 2, text: "Design onboarding flow for music learning", done: false, assignee: CREATORS[1], priority: "high" },
    { id: 3, text: "Research spaced repetition + music correlation", done: false, assignee: CREATORS[4], priority: "medium" },
    { id: 4, text: "Build WebAudio API prototype (sub-20ms)", done: false, assignee: CREATORS[3], priority: "high" },
    { id: 5, text: "User testing plan — recruit 10 beta testers", done: false, assignee: CREATORS[2], priority: "low" }
  ]);
  const [newTask, setNewTask] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, author: CREATORS[0], text: "Key insight: Songs with repetitive chorus sections work best for vocabulary retention. Start with pop music catalog.", time: "2h ago" },
    { id: 2, author: CREATORS[3], text: "WebAudio API latency benchmarks: Chrome 12ms, Firefox 18ms, Safari 15ms. We're within target on all browsers.", time: "5h ago" }
  ]);
  const [newNote, setNewNote] = useState("");
  const files = [
    { name: "audio-engine-arch.pdf", type: "pdf", size: "2.4 MB", author: CREATORS[3], time: "Today" },
    { name: "onboarding-mockups.fig", type: "design", size: "8.1 MB", author: CREATORS[1], time: "Yesterday" },
    { name: "user-research-notes.md", type: "doc", size: "45 KB", author: CREATORS[4], time: "2d ago" },
    { name: "pitch-deck-v2.pptx", type: "presentation", size: "5.2 MB", author: CREATORS[2], time: "3d ago" }
  ];
  const fileIcons = { pdf: "#FF6B6B", design: "#A78BFA", doc: "#4ECDC4", presentation: "#FFB84D" };

  const addTask = () => { if (newTask.trim()) { setTasks(prev => [...prev, { id: prev.length + 1, text: newTask, done: false, assignee: null, priority: "medium" }]); setNewTask(""); } };
  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const addNote = () => { if (newNote.trim()) { setNotes(prev => [{ id: prev.length + 1, author: { name: "You", avatar: "AC", color: "#FF6B6B" }, text: newNote, time: "Just now" }, ...prev]); setNewNote(""); } };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{t("workspace_title", lang)}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge color="#FFB84D" variant="filled">{t("ws_status_active", lang)}</Badge>
            <span style={{ color: "#64748B", fontSize: 12 }}>{t("ws_deadline", lang)}: Apr 26, 2026</span>
          </div>
        </div>
        <Button variant="secondary" size="sm" icon={Users} onClick={() => onNavigate("chat")}>{t("chat_title", lang)}</Button>
      </div>

      {/* Project Brief Card */}
      <GlassCard style={{ padding: 20, marginBottom: 20, background: "linear-gradient(135deg, rgba(255,107,107,0.06), rgba(167,139,250,0.06))" }} hover={false}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <ClipboardList size={16} style={{ color: "#FFB84D" }} />
          <span style={{ color: "#F1F5F9", fontSize: 15, fontWeight: 600 }}>{t("ws_brief", lang)}: AI Music Language Learning</span>
        </div>
        <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
          Build a working prototype that lets users learn languages through singing. AI analyzes pronunciation, rhythm, and meaning in real-time. Target: 5-minute demo for pitch day.
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: "#94A3B8", fontSize: 12 }}>{t("ws_progress", lang)}</span>
              <span style={{ color: "#FFB84D", fontSize: 12, fontWeight: 600 }}>{progressPct}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #FF6B6B, #FFB84D)", borderRadius: 3, transition: "width 0.5s ease" }} />
            </div>
          </div>
          <span style={{ color: "#64748B", fontSize: 12 }}>{completedCount}/{tasks.length} {t("ws_tasks", lang).toLowerCase()}</span>
        </div>
      </GlassCard>

      {/* Team Members */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ color: "#94A3B8", fontSize: 13, fontWeight: 500 }}>{t("ws_members", lang)}:</span>
        <div style={{ display: "flex", gap: 6 }}>
          {[CREATORS[0], CREATORS[1], CREATORS[3], CREATORS[4]].map(c => (
            <div key={c.id} onClick={() => onNavigate("profile", c)} style={{ cursor: "pointer" }} title={c.name}>
              <Avatar name={c.name} avatar={c.avatar} color={c.color} size={32} />
            </div>
          ))}
          <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => onNavigate("match")}>
            <Plus size={14} style={{ color: "#475569" }} />
          </div>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 4 }}>
        {[
          { key: "tasks", label: t("ws_tasks", lang), Icon: CheckSquare },
          { key: "files", label: t("ws_files", lang), Icon: FolderOpen },
          { key: "notes", label: t("ws_notes", lang), Icon: FileText }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveWsTab(tab.key)}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", borderRadius: 10, border: "none", background: activeWsTab === tab.key ? "rgba(255,107,107,0.12)" : "transparent", color: activeWsTab === tab.key ? "#FF6B6B" : "#64748B", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
            <tab.Icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tasks Tab */}
      {activeWsTab === "tasks" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} placeholder={t("ws_add_task", lang)} style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#F1F5F9", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
            <Button variant="secondary" size="sm" onClick={addTask}>{t("add", lang)}</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {tasks.map(task => {
              const prioColor = task.priority === "high" ? "#FF6B6B" : task.priority === "medium" ? "#FFB84D" : "#4ECDC4";
              return (
                <GlassCard key={task.id} style={{ padding: 14 }} hover={false}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div onClick={() => toggleTask(task.id)} style={{ width: 22, height: 22, borderRadius: 6, border: task.done ? "none" : "2px solid rgba(255,255,255,0.15)", background: task.done ? "linear-gradient(135deg, #34D399, #4ECDC4)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}>
                      {task.done && <Check size={14} style={{ color: "#fff" }} />}
                    </div>
                    <span style={{ flex: 1, color: task.done ? "#64748B" : "#E2E8F0", fontSize: 14, textDecoration: task.done ? "line-through" : "none", transition: "all 0.2s" }}>{task.text}</span>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: prioColor, flexShrink: 0 }} title={task.priority} />
                    {task.assignee && <Avatar name={task.assignee.name} avatar={task.assignee.avatar} color={task.assignee.color} size={24} />}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Files Tab */}
      {activeWsTab === "files" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {files.map((f, i) => (
            <GlassCard key={i} style={{ padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${fileIcons[f.type] || "#94A3B8"}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FileText size={18} style={{ color: fileIcons[f.type] || "#94A3B8" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 500 }}>{f.name}</div>
                  <div style={{ color: "#64748B", fontSize: 11 }}>{f.size} · {f.author.name} · {f.time}</div>
                </div>
                <Button variant="ghost" size="sm" style={{ padding: 6 }}><ExternalLink size={14} /></Button>
              </div>
            </GlassCard>
          ))}
          <GlassCard style={{ padding: 20, textAlign: "center", borderStyle: "dashed" }}>
            <Paperclip size={20} style={{ color: "#475569", marginBottom: 8 }} />
            <p style={{ color: "#64748B", fontSize: 13 }}>Drag & drop files or click to upload</p>
          </GlassCard>
        </div>
      )}

      {/* Notes Tab */}
      {activeWsTab === "notes" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder={t("ws_add_note", lang)} rows={3} style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: 8 }} />
            <Button variant="secondary" size="sm" onClick={addNote}>{t("add", lang)}</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {notes.map(note => (
              <GlassCard key={note.id} style={{ padding: 16 }} hover={false}>
                <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <Avatar name={note.author.name} avatar={note.author.avatar} color={note.author.color} size={28} />
                  <div>
                    <span style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 600 }}>{note.author.name}</span>
                    <span style={{ color: "#475569", fontSize: 11, marginLeft: 8 }}>{note.time}</span>
                  </div>
                </div>
                <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }}>{note.text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Notifications ---
function NotificationsPage({ onNavigate }) {
  const notifications = [
    { type: "match", title: "New match suggestion!", desc: "Kai Nakamura (94% match) could be perfect for your project.", time: "2 min ago", color: "#FF6B6B", icon: Sparkles, read: false },
    { type: "challenge", title: "Challenge ending soon!", desc: "\"Ship Something Small\" ends in 3 days. 142 creators already submitted.", time: "30min ago", color: "#FFB84D", icon: Flame, read: false },
    { type: "like", title: "Your idea is trending!", desc: "\"AI-Powered Language Learning\" received 50 new likes today.", time: "1h ago", color: "#F472B6", icon: Heart, read: false },
    { type: "xp", title: "+50 XP earned!", desc: "You posted a new idea. Keep your streak going!", time: "2h ago", color: "#34D399", icon: Zap, read: false },
    { type: "comment", title: "New comment from Zara", desc: "\"The neuroscience angle here is fascinating...\"", time: "3h ago", color: "#4ECDC4", icon: MessageCircle, read: true },
    { type: "collab", title: "Collaboration invite", desc: "Leo Park invited you to join MindMap project.", time: "6h ago", color: "#A78BFA", icon: UserPlus, read: true },
    { type: "streak", title: "14-day streak!", desc: "You've been creating for 2 weeks straight. Keep it up!", time: "1d ago", color: "#FF6B6B", icon: Flame, read: true },
    { type: "program", title: "Registration confirmed", desc: "You're registered for Future World Lab: 2050!", time: "1d ago", color: "#FFB84D", icon: Award, read: true }
  ];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700 }}>Notifications</h1>
        <Button variant="ghost" size="sm">Mark all read</Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {notifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <GlassCard key={i} onClick={() => {}} style={{ padding: 16, borderLeft: !n.read ? `3px solid ${n.color}` : "3px solid transparent" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${n.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={18} style={{ color: n.color }} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ color: "#F1F5F9", fontSize: 14, fontWeight: n.read ? 400 : 600 }}>{n.title}</span>
                    <span style={{ color: "#64748B", fontSize: 11, whiteSpace: "nowrap" }}>{n.time}</span>
                  </div>
                  <p style={{ color: "#94A3B8", fontSize: 13 }}>{n.desc}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================
// ============================================
// AUTH PAGES — Login / Register / Onboarding
// ============================================
function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login"); // "login" | "register" | "onboarding"
  const [step, setStep] = useState(1);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Onboarding states
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState(null);

  const allSkills = ["AI/ML", "React", "Python", "UI/UX", "Design", "Marketing", "Storytelling", "Data Science", "3D Art", "Game Design", "Robotics", "Strategy", "Community Building", "Filmmaking", "Music Production", "Writing", "Mobile Dev", "Blockchain", "VR/AR", "Research"];
  const allInterests = ["EdTech", "Climate Action", "Social Impact", "Gaming", "DevTools", "Health & Wellness", "Space", "Creative Arts", "Open Source", "Indie Hacking", "Future of Work", "Sustainability", "Mental Health", "Music", "Film", "Architecture"];
  const roles = [
    { key: "creator", label: "Creator / Maker", desc: "I build things — code, art, products, or experiences", icon: Rocket, color: "#FF6B6B" },
    { key: "explorer", label: "Explorer", desc: "I'm looking for inspiration and the right team to join", icon: Compass, color: "#4ECDC4" },
    { key: "mentor", label: "Mentor / Advisor", desc: "I want to guide and support young creators", icon: Award, color: "#FFB84D" },
    { key: "investor", label: "Supporter / Investor", desc: "I want to back promising ideas and teams", icon: Briefcase, color: "#A78BFA" }
  ];

  const toggleItem = (item, list, setter) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const handleLogin = () => {
    if (email && password) onAuth({ name: name || "Creator", email });
  };

  const handleRegister = () => {
    if (name && email && password) { setMode("onboarding"); setStep(1); }
  };

  const handleFinishOnboarding = () => {
    onAuth({ name, email, skills: selectedSkills, interests: selectedInterests, bio, location, role });
  };

  // Shared field style
  const fieldStyle = { width: "100%", padding: "12px 14px 12px 42px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  const iconPos = { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#475569" };

  // --- ONBOARDING FLOW ---
  if (mode === "onboarding") {
    return (
      <div style={{ minHeight: "calc(100vh - 56px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ maxWidth: 520, width: "100%", position: "relative" }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? "linear-gradient(135deg, #FF6B6B, #FFB84D)" : "rgba(255,255,255,0.06)", transition: "all 0.3s" }} />
            ))}
          </div>

          {/* Step 1: Choose your role */}
          {step === 1 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🌟</div>
                <h2 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Welcome, {name}!</h2>
                <p style={{ color: "#94A3B8", fontSize: 15 }}>What brings you to Meta-Create?</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {roles.map(r => {
                  const Icon = r.icon;
                  const selected = role === r.key;
                  return (
                    <div key={r.key} onClick={() => setRole(r.key)} style={{ padding: 20, borderRadius: 16, background: selected ? `${r.color}10` : "rgba(255,255,255,0.04)", border: `1px solid ${selected ? r.color + "40" : "rgba(255,255,255,0.08)"}`, cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${r.color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                        <Icon size={22} style={{ color: r.color }} />
                      </div>
                      <div style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{r.label}</div>
                      <div style={{ color: "#64748B", fontSize: 12, lineHeight: 1.4 }}>{r.desc}</div>
                    </div>
                  );
                })}
              </div>
              <Button fullWidth size="lg" onClick={() => role && setStep(2)} style={{ opacity: role ? 1 : 0.4 }}>Continue</Button>
            </div>
          )}

          {/* Step 2: Pick skills */}
          {step === 2 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🛠️</div>
                <h2 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>What are your superpowers?</h2>
                <p style={{ color: "#94A3B8", fontSize: 15 }}>Select skills that best describe you (pick at least 2)</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24, justifyContent: "center" }}>
                {allSkills.map(skill => {
                  const selected = selectedSkills.includes(skill);
                  return (
                    <button key={skill} onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
                      style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${selected ? "#FF6B6B40" : "rgba(255,255,255,0.08)"}`, background: selected ? "rgba(255,107,107,0.12)" : "rgba(255,255,255,0.03)", color: selected ? "#FF6B6B" : "#94A3B8", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                      {selected && <Check size={12} style={{ marginRight: 4 }} />}{skill}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="secondary" onClick={() => setStep(1)} icon={ChevronLeft}>Back</Button>
                <Button fullWidth size="lg" onClick={() => selectedSkills.length >= 2 && setStep(3)} style={{ opacity: selectedSkills.length >= 2 ? 1 : 0.4 }}>Continue</Button>
              </div>
            </div>
          )}

          {/* Step 3: Pick interests */}
          {step === 3 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
                <h2 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>What excites you?</h2>
                <p style={{ color: "#94A3B8", fontSize: 15 }}>Choose topics you want to explore (pick at least 2)</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24, justifyContent: "center" }}>
                {allInterests.map(interest => {
                  const selected = selectedInterests.includes(interest);
                  return (
                    <button key={interest} onClick={() => toggleItem(interest, selectedInterests, setSelectedInterests)}
                      style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${selected ? "#4ECDC440" : "rgba(255,255,255,0.08)"}`, background: selected ? "rgba(78,205,196,0.12)" : "rgba(255,255,255,0.03)", color: selected ? "#4ECDC4" : "#94A3B8", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                      {selected && <Check size={12} style={{ marginRight: 4 }} />}{interest}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="secondary" onClick={() => setStep(2)} icon={ChevronLeft}>Back</Button>
                <Button fullWidth size="lg" onClick={() => selectedInterests.length >= 2 && setStep(4)} style={{ opacity: selectedInterests.length >= 2 ? 1 : 0.4 }}>Continue</Button>
              </div>
            </div>
          )}

          {/* Step 4: Bio + Location */}
          {step === 4 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
                <h2 style={{ color: "#F8FAFC", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Almost there!</h2>
                <p style={{ color: "#94A3B8", fontSize: 15 }}>Tell the community a bit about yourself</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Your bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="e.g., AI researcher × visual artist. Building tools that make creativity accessible to everyone." rows={3} style={{ width: "100%", padding: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Location</label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={16} style={iconPos} />
                    <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., San Francisco, Beijing, London..." style={fieldStyle} />
                  </div>
                </div>
              </div>
              {/* Preview card */}
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 20, marginBottom: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B6B, #FFB84D)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>{name.split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
                  <div>
                    <div style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 600 }}>{name}</div>
                    {location && <div style={{ color: "#64748B", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} /> {location}</div>}
                  </div>
                </div>
                {bio && <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>{bio}</p>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {selectedSkills.slice(0, 4).map(s => <span key={s} style={{ padding: "3px 10px", borderRadius: 12, background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.2)", color: "#4ECDC4", fontSize: 11, fontWeight: 500 }}>{s}</span>)}
                  {selectedSkills.length > 4 && <span style={{ padding: "3px 10px", borderRadius: 12, background: "rgba(255,255,255,0.04)", color: "#64748B", fontSize: 11 }}>+{selectedSkills.length - 4}</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="secondary" onClick={() => setStep(3)} icon={ChevronLeft}>Back</Button>
                <Button fullWidth size="lg" icon={Rocket} onClick={handleFinishOnboarding}>Launch My Profile</Button>
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }

  // --- LOGIN / REGISTER FORMS ---
  const featureBullets = [
    { Icon: Sparkles, text: "AI matches you with creators who complete your vision", color: "#FF6B6B" },
    { Icon: Users, text: "2,400+ builders across 45 countries", color: "#4ECDC4" },
    { Icon: Rocket, text: "850+ real projects launched and counting", color: "#FFB84D" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 56px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(255,107,107,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(78,205,196,0.06) 0%, transparent 50%)", pointerEvents: "none" }} />

      {/* Left panel — branding */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 40px", position: "relative" }}>
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#F8FAFC", lineHeight: 1.15, marginBottom: 16 }}>
            Where Ideas<br />
            <span style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB84D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Find Their Team</span>
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
            The world's first creation-first social platform. Post a spark, meet your dream team, build something real.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {featureBullets.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, color: "#94A3B8", fontSize: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.Icon size={16} style={{ color: item.color }} />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", position: "relative" }}>
        <div style={{ maxWidth: 400, width: "100%", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "36px 32px" }}>
          {/* Tab toggle */}
          <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 4 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => setMode(m)}
                style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: mode === m ? "rgba(255,107,107,0.12)" : "transparent", color: mode === m ? "#FF6B6B" : "#64748B", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Social logins */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[
              { name: "Google", bg: "#4285F4" },
              { name: "GitHub", bg: "#333" },
              { name: "WeChat", bg: "#07C160" }
            ].map(p => (
              <button key={p.name} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#CBD5E1", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700 }}>{p.name[0]}</div>
                {p.name}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <span style={{ color: "#475569", fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            {mode === "register" && (
              <div style={{ position: "relative" }}>
                <User size={16} style={iconPos} />
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={fieldStyle} />
              </div>
            )}
            <div style={{ position: "relative" }}>
              <Mail size={16} style={iconPos} />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={fieldStyle} />
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={iconPos} />
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type={showPassword ? "text" : "password"} style={fieldStyle} />
              <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 4 }}>
                <Eye size={16} />
              </button>
            </div>
            {mode === "register" && (
              <p style={{ color: "#475569", fontSize: 11, lineHeight: 1.5 }}>
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
            )}
            {mode === "login" && (
              <button style={{ background: "none", border: "none", color: "#FF6B6B", fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "right", padding: 0 }}>Forgot password?</button>
            )}
          </div>

          <Button fullWidth size="lg" icon={mode === "register" ? Rocket : ArrowRight} onClick={mode === "login" ? handleLogin : handleRegister}>
            {mode === "login" ? "Sign In" : "Get Started"}
          </Button>

          <p style={{ textAlign: "center", color: "#475569", fontSize: 13, marginTop: 20 }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ background: "none", border: "none", color: "#FF6B6B", cursor: "pointer", fontWeight: 600, fontFamily: "inherit", fontSize: 13 }}>
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================
export default function MetaCreateApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("landing");
  const [pageData, setPageData] = useState(null);
  const [history, setHistory] = useState([]);
  const [lang, setLang] = useState("en");

  const handleAuth = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setPage("landing");
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setPage("landing");
  };

  const navigate = useCallback((target, data = null) => {
    setHistory(prev => [...prev, { page, data: pageData }]);
    setPage(target);
    setPageData(data);
    window.scrollTo(0, 0);
  }, [page, pageData]);

  const goBack = useCallback(() => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setPage(prev.page);
      setPageData(prev.data);
      setHistory(h => h.slice(0, -1));
      window.scrollTo(0, 0);
    }
  }, [history]);

const navItems = [
    { key: "landing", label: t("nav_home", lang), icon: Home },
    { key: "feed", label: t("nav_explore", lang), icon: Grid3X3 },
    { key: "match", label: t("nav_match", lang), icon: Sparkles },
    { key: "create", label: t("nav_create", lang), icon: Plus }
  ];

  return (
    <LangContext.Provider value={lang}>
    <div style={{ minHeight: "100vh", background: "#0F1729", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#E2E8F0" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15,23,41,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 10px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, minHeight: 56, flexWrap: "nowrap" }}>
          <div onClick={() => navigate("landing")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}>
            {/* <img src="/logo.png" alt="青年元创计划 Origin Launch" style={{ height: 40, maxWidth: 160, width: "auto", objectFit: "contain", display: "block" }} /> */}
            <img src={logo} alt="Meta-Create" style={{ height: 40, maxWidth: 160, width: "auto", objectFit: "contain", display: "block" }} 
            <span style={{ fontWeight: 700, fontSize: 16, color: "#F8FAFC" }}>Meta-Create</span>
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const active = page === item.key;
              return (
                <button key={item.key} onClick={() => navigate(item.key)}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 8, border: "none", background: active ? "rgba(255,107,107,0.12)" : "transparent", color: active ? "#FF6B6B" : "#94A3B8", fontSize: 12, fontWeight: active ? 600 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                  <Icon size={15} />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Language Toggle — 已隐藏
            <button onClick={() => setLang(lang === "en" ? "zh" : "en")} style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "4px 10px", cursor: "pointer", color: "#94A3B8", fontSize: 11, fontWeight: 600, fontFamily: "inherit", transition: "all 0.2s" }} title={lang === "en" ? "切换中文" : "Switch to English"}>
              <Globe size={12} />
              <span>{lang === "en" ? "中文" : "EN"}</span>
            </button>
            */}
            {isLoggedIn ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,107,107,0.08)", borderRadius: 8, padding: "4px 8px" }}>
                  <Flame size={12} style={{ color: "#FF6B6B" }} />
                  <span style={{ color: "#FF6B6B", fontSize: 11, fontWeight: 700 }}>14</span>
                </div>
                <Avatar name={user?.name || "You"} avatar={user?.name ? user.name.split(" ").map(w=>w[0]).join("").slice(0,2) : "AC"} color="#FF6B6B" size={30} />
                <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }} title="Sign out">
                  <LogOut size={14} />
                </button>
              </>
            ) : (
              <button onClick={() => navigate("auth")} style={{ display: "flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg, #FF6B6B, #FFB84D)", border: "none", borderRadius: 10, padding: "7px 16px", cursor: "pointer", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "inherit", transition: "all 0.2s" }}>
                <LogIn size={14} /> Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
      <main style={{ paddingBottom: 40 }}>
        {page === "landing" && <LandingPage onNavigate={navigate} />}
        {page === "feed" && <FeedPage onNavigate={navigate} />}
        {page === "detail" && <DetailPage post={pageData} onNavigate={navigate} onBack={goBack} />}
        {page === "profile" && <ProfilePage creator={pageData} onBack={goBack} onNavigate={navigate} />}
        {page === "match" && <MatchHubPage onNavigate={navigate} />}
        {page === "create" && <CreatePostPage onNavigate={navigate} />}
        {page === "community" && <CommunityPage onNavigate={navigate} />}
        {page === "collab" && <CollabPage onNavigate={navigate} />}
        {page === "chat" && <ChatPage onNavigate={navigate} />}
        {page === "workspace" && <WorkspacePage onNavigate={navigate} />}
        {page === "programs" && <ProgramsPage />}
        {page === "notifications" && <NotificationsPage onNavigate={navigate} />}
        {page === "auth" && <AuthPage onAuth={handleAuth} />}
      </main>
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 16px", textAlign: "center" }}>
        <p style={{ color: "#475569", fontSize: 12 }}>Meta-Create — From Meta-Point, To Infinite Possibilities</p>
        <p style={{ color: "#334155", fontSize: 11, marginTop: 4 }}>Building the future, one creator at a time.</p>
      </footer>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(255,107,107,0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: #475569; }
        @media (max-width: 700px) { .nav-label { display: none; } }
      `}</style>
    </div>
    </LangContext.Provider>
  );
}
