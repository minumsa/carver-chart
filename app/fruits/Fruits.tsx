"use client";

import { useEffect, useState } from "react";

const Fruits = () => {
  const fruitsArr: string[] = [
    "🍇",
    "🍈",
    "🍉",
    "🍊",
    "🍋",
    "🍌",
    "🍍",
    "🥭",
    "🍎",
    "🍏",
    "🍐",
    "🍑",
    "🍒",
    "🍓",
    "🫐",
    "🥝",
    "🍅",
  ];

  const apple: string[] = [
    "대부분 사과 껍질을 칼로 깎고 잘라서 먹는 한국과는 달리, 미국에서는 껍질을 깎지 않고 통째로 베어 먹는 사람들이 많다. 특히 학교나 회사에서 점심을 도시락(주로 집에서 싸온 샌드위치나 햄버거, 파스타 등)으로 해결한 후 습관 삼아 사과 하나를 깨물어 먹는 사람들이 정말 많은데, 이는 사과를 베어 먹는 소리나 모습이 딱히 타인에게 해를 끼치지 않는다고 생각하기 때문이다. 이 때문인지 한국에서는 사과를 별로 먹지 않다가 미국에서 사과를 하루에 한 개씩 먹는 사람들도 있다고 한다.",
    "미국에 방문하여 미국 영화 등에서 곧잘 볼 수 있는 홀쭉하고 윤이 나는 예쁜 사과를 실제로 먹어 봤더니 마치 설탕 덩어리 같은 느낌이라 영 맛이 없더라는 후기를 찾아볼 수 있다. 원래부터 그런 맛의 사과를 즐기던 미국인들은 맛있게 잘 먹겠지만, 그런 맛에 익숙하지 않은 한국인에겐 곤욕스러울 수밖에 없다. 이런 이들의 취향을 극대화한 식품으로 캔디 애플이라는 탕후루와 유사한 사과 사탕이 있다.",
    "후각이 민감한 사람이면 사과 수확철의 과수원에 낀 안개에서 사과향을 맡을 수도 있다고 한다.",
    "사과나무를 태우면 예쁜 푸른 불꽃이 피어난다고 한다. 또 나무에서 나는 향이 좋아서 요리용 장작계에서는 제법 고급이라고 한다. 외향과는 별개로 태울 때 연기는 독하다.",
    "북한에서는 김일성 일가를 위해 개고기와 개구리를 거름으로 주는, 정확히 말해 개 한 마리를 죽여서 나무 밑에 묻고 개구리 한 삼태기를 잡아서 또 묻어 재배한 사과도 있었다고 한다.",
    "뻑뻑해진 사과나 맛없는 사과는 시나몬 가루와 코코넛 오일을 사다가 코코넛 오일을 넣고 중불에서 2분 30초 정도 구운 뒤 시나몬 가루를 뿌려먹으면 맛있다. 단 시나몬은 호불호가 강해 시나몬을 좋아하지 않는다면 견과류를 뿌려먹어도 좋다.",
    "스펀지 167회에 따르면 생소면으로도 사과를 관통할 수도 있다고 하며, 이는 과점 부분을 찍으면 가능하다. 당연하지만 과점마다 수십 개의 소면을 박아놓았더니 사과가 상해버렸다.",
    "사과씨를 먹으면 안된다는 말이 있다. 시안화수소계열인 청산배당체(아미그다린)가 이 독성의 주범인데, 아몬드에도 들어있는 그 성분이다. 사실 많이 과장된 이야기인데, 확실히 몸에 좋지는 않으나 그렇다고 해서 사과씨를 삼키면 안 되는 것은 아니니까 겁낼 필요는 없다. 보통 성인의 경우 사과씨 종이컵 양 정도를 섭취하면 치명적이니 한 두개 실수로 섭취하였어도 죽지는 않는다. 다만 사람에 따라서는 섭취 시 속이 쓰린 사람이 있으니 몸에 별 이상은 없다고 해도 굳이 먹지 않는 것을 추천한다. 그리고 보통 성인에게 큰 문제가 없다고 해도 유아의 경우 조심할 필요가 있으며 또한 몸집이 작은 소동물에게는 매우 치명적일 수 있으니 절대로 먹이지 말자.",
    "1999년 엘리자베스 2세가 방한하여 안동 하회마을을 방문했을 때, 안동 지역의 사과 맛에 반해 그 때부터 엘리자베스 2세의 생일 때마다 안동 사과를 선물로 보내고 있었다. 2019년에는 앤드류 왕자가 방한해 안동 도매시장에서 사과를 한 박스를 사갔었다, 그러나 엘리자베스 2세가 사망하면서 이제는 어찌될지는 미지수.",
    "사과나무 가지는 친칠라, 햄스터 등의 설치류에 속하는 반려동물들의 간식용으로도 사용된다. 특히 친칠라가 사족을 못 쓸 정도로 사과나무 가지를 정말로 좋아한다. 화가 난 친칠라에게 사과나무 가지 하나 쥐어주면 바로 성질을 풀고 순해질 정도. 하지만 늘 그런 것만은 아닌지 어떤 친칠라는 사과나무 가지마저도 던져버릴 정도로 화를 내기도 하는 모양.",
    "세상에서 가장 무거운 사과의 무게는 1.849kg(4lb 1oz)이었으며 2005년 10월 24일 일본 히로사키시에 있는 사과 농장에서 이와사키 치사토에 의해 재배되었다.",
    "데스노트의 류크는 사과를 무척 좋아한다. 2023년 뮤지컬판 대본에 따르면, 류크에게 사과는 인간의 술-담배와 같다고 한다.",
    "애플의 로고가 한입 베어문 사과 형태인 이유에 대한 추측으로 앨런 튜링(Alan Turing 1912~1953)이 언급되기도 한다. 그는 컴퓨터 공학에서 위대한 업적을 남겼음에도 불구하고 비극적이고 초라한 최후를 맞이했다. 당시엔 동성애가 엄청난 사회적 금기였는데, 그의 동성애 행적이 어떠한 이유로 낱낱이 공개되어 버리고 말았기 때문이다. 상심한 그는 자신의 실험실에서 주사기로 사과에 청산가리를 주입해 한입 베어물고 자살했다고 알려져 있다. 소문에 따르면 평소 그를 존경했던 스티브 잡스, 스티브 워즈니악이 자신들의 회사 로고에 그에 대한 존경심을 재치있게 담았다고 한다.",
  ];

  const grape: string[] = [
    "이솝 우화에는 어떤 사슴이 사냥꾼에게 쫓기다가 이 포도나무에 숨은 덕에 살았는데, 이후에 너무 배가 고파서 포도나무 잎을 먹어치우다 사냥꾼에게 들켜 잡히는 이야기가 있다.",
    "탈무드에선 아담이 포도나무를 심을 때 악마가 그게 뭐냐고 묻자 맛있고 기분 좋아지는 물(포도주)을 만드는 열매가 맺는 나무라 했고, 악마는 포도가 잘 자라는 데 도움을 줄 테니 자신도 마시게 해달라고 했다. 아담이 허락하자 악마는 양과 사자, 돼지, 원숭이의 피로 포도를 키웠다. 그 결과 술을 마시면 양처럼 순해지다가 사자처럼 사나워지고, 필름 끊기면 돼지처럼 아무 데서나 뒹굴고 원숭이처럼 날뛰게 되었다고 한다. 주사를 표현한 것이다.",
    "그리스 로마 신화에선 디오니소스의 동성 애인 암펠로스가 사고로 사망한 후 포도나무로 변했다고 한다.",
    "포도꽃은 꽃 중에서도 아주 이상한 구조를 갖고 있기로 유명한데, 꽃잎이 퇴화된 것 처럼 보이지만 사실은 있다. 대부분의 꽃잎이 아래에 모여있으며, 피어날 때도 아래에서 위를 향해 벌어지며 피지만 포도는 반대로 위에 모여있고 아래가 갈라지며 벌어지며, 활짝 피면 꽃잎이 떨어진다.",
    "신선한 포도는 하얀 왁스같은 가루가 묻어있는 경우가 있는데, 흔히 먼지나 농약으로 오해하지만 사실 '블룸'이라고 부르는 것으로, 과일의 수분을 보호하는 기능을 갖고 있어서 없으면 포도의 상품가치가 떨어진다. 씻을 때 밀가루에 넣은 뒤 물에 헹구면 곳곳이 잘 씻긴다고 한다.",
    "포도를 아주 좋아하는 동물은 개코원숭이다. 특히 와인 산지인 남아프리카공화국에서는 포도 과수원을 운영하는 사람들에게 떼지어서 포도를 쓸어가는 개코원숭이는 서리꾼이나 다름없어서 갈등을 심심찮게 빚는다.",
    "보건환경연구원의 자료에 따르면 포도 부위별 레스베라트롤 함량 분석 결과 포도송이 가지에는 포도 씨나 껍질보다 약 17배나 많은 양이 함유되어 있다.",
    "영국 페닌슐라의 의대 연구팀에 따르면 포도의 자연 함유된 레스베라트롤은 고혈당에 의해 유발되는 체포 내 혈관 손상을 예방한다. 또한 레스베라트롤은 고밀도 지방 단백질과 제2형 당뇨병의 인슐린 수치를 증가시키는 역할도 한다.",
    "서양에서는 개과 동물인 여우가 포도를 좋아한다는 속설이 있다. 이는 여우가 부드러운 포도밭 땅에 굴을 종종 파는 것을 포도를 먹기 위해 왔다고 착각했기 때문이다. 이 인식은 역사가 꽤나 깊어서 이솝우화에도 여우와 포도 이야기로 나올 정도이다.",
    "개가 포도를 먹으면 매우 위험하다. 초콜릿이나 자일리톨보다도 더 위험하다. 한 알도 치명적이므로 절대 주면 안 된다. 포도로 만든 건포도나 포도주스도 마찬가지. 포도의 정확히 어떤 성분 때문인지는 밝혀지지 않았으나, 주석산 때문이라는 것이 가장 유력하다.",
  ];

  const strawberry: string[] = [
    "딸기는 논산 육군훈련소에 입소한 많은 훈련병들을 냄새로 고문하는 존재라고 한다. 참고로 논산시 마스코트가 딸기일 정도로 논산에서는 딸기가 많이 재배된다. 딸기시험장도 있다. 지리적 표시제/대한민국에 담양 딸기가 등록되어 있다. 어째서인지 논산 딸기는 등록되지 않았다. 담양, 논산 이외에도 거창, 청주, 세종 등지가 딸기 주산지이다.",
    "딸기가 많이 나는 지역 중 일부에서는 국도변에 트럭이나 천막을 세워놓고 딸기를 팔기도 한다. 딸기를 담아서 파는 용기는 다양하지만, 시장에서 가장 흔히 농민들이 담아 파는 것은 빨간 플라스틱 대야이다.",
    `러시아, 동남아시아 등지에서는 한국에서 생산되는 딸기가 굉장한 인기라고 한다. 당도가 높고 식감이 좋아 선호한다는 등 인기가 엄청 높다. 이 때문에 불법 노점상도 성행하는데, 공항 직원들에게는 유명한 '딸기 아저씨'가 있다고 한다. 이 아저씨는 단속을 피해 딸기를 실은 트럭을 멀찌감치 주차하고, 딸기를 판다는 표지판을 들고 서 있는다. 그러면 귀국하는 외국인들이 아저씨에게 돈을 건네고, 아저씨는 몇 분간 사라졌다가 딸기를 가득 들고 돌아온다고. 한국 현지 가격의 2~3배에 파는데도 없어서 못 팔 지경이라고 한다. 오죽했으면 공항에 자주 들르는 한국인 지인이 투고자인 직원에게 "은퇴하면 딸기 장사나 해 보시는 게 어떻겠냐"고 제안했을 정도. 수확 후 당도가 급격하게 떨어지는 특성으로 인해 싱가포르와 홍콩으로 '비행기'로 실어 수출하고 있다.`,
    "외국 딸기의 경우 소금물에 30분간 담가놓으면 하얀 벌레가 나오는 경우가 있다. '벗초파리'의 유충인데 딸기나 자두 같은 껍질이 얇은 과일에서 주로 나온다고 한다. 국내 한 프로그램에서 같은 실험을 해봤으나 국내산 딸기에서는 벌레가 나오지 않는다고 한다. 하지만 산딸기에선 유충이 나왔다. 다만 실수로 먹게 되더라도 인체엔 무해하다. 소화되어 단백질이 될 뿐이다.",
    "딸기의 표면에는 약 200개 정도의 어마어마하게 많은 씨앗이 붙어있다. 딸기는 씨로 심어서 기르는 사람도 더러 있지만 키우기 어려워서 주로 모본에서 뻗어 나오는 줄기(런너)를 잘라 키운다. 씨에서 난 딸기는 개량된 품종의 큼지막한 딸기가 아니라 위 사진과 같은 왜소한 딸기가 열리기 때문에 더더욱 그렇다.",
  ];

  const banana: string[] = [
    "바나나를 나무에서 열리는 것처럼 묘사하는 문장이나 삽화가 많지만, 바나나는 사실 목본식물이 아니라 여러해살이식물인 초본식물이다. 크기로 짐작할 수 있듯이 세계 최대의 초본식물 중 하나로 기둥 부분 및 줄기는 나무와 비슷해 보이지만 사실 잎과 비슷한 구조물이 물고기의 비늘처럼 여러 겹으로 층층이 겹친 형태라 나무 줄기와는 다르다. 그래서 이를 의사줄기 또는 헛줄기라고 부른다.",
    "열매로서의 바나나는 일반적으로 과일로 분류된다. 바나나가 초본, 즉 나무가 아니라 풀의 열매인 점을 들어 채소라는 주장이 있는데 엄밀히 따지면 이게 맞는 말이나 한국어에서 과일이라 함은 나무나 초본(풀)에 열리는, 사람이 먹을 수 있는 열매를 가리키므로 과일이라 칭해도 무방하다.",
    "생의 바나나는 씨가 굵고 딱딱해서 먹기가 불편하기 때문에, 먹기 편하게 다배체인 변종들이 선발되었다. 현대에 먹는 바나나도 씨가 아주 없지는 않고 잘 찾아보면 미성숙한 바나나 씨가 바나나 속에 까만 점 같이 있다. 이건 바나나에 따라 들어 있기도 하고 들어 있지 않기도 하다.",
    "바나나와 사람의 DNA 구조는 약 60% 정도로 비슷하다. 생화학 시간에 많이 나오는 내용인데, 사람의 체내에서 일어나는 모든 화학반응 종류의 50% 정도는 바나나 내에서도 동일하게 이루어진다.",
    "한때 지식채널e, 인터넷 일각에서 재배종들은 무성생식으로 획일화가 된 탓에 전염병이 퍼지면 멸종할지 모른다는 주장도 나오기도 했는데, 더 깊게 파고들면 허무맹랑한 소리라는 걸 알 수 있다. 재배종은 어떤 작물이건 유전적 다양성이 있는 작물이 없다. 사과처럼 씨가 있다 해도 꺾꽂이로 키워서 유전적 단일체인 건 마찬가지다. 꺾꽂이를 비롯한 영양생식으로 키우는 식물은 감자처럼 식량 작물의 3할이 넘는다. 그리고 수천년의 개량으로 종자가 수천종이 넘는다. 재배하는 품종이 몇 개 안 되는 거지 다양한 버전의 바나나 종자 수천 종이 종자은행에 있다. 사실 바나나 멸종의 가해자로 지목되는 진균류야말로 유전적 단일체의 표본이다. 세계에서 가장 큰 생물도 지름 20km의 균사체이니.",
    "사람들이 쉽게 연상하는 바나나는 노란색 바나나이지만, 바나나도 그 종류가 다양해서 구우면 감자와 비슷한 맛이 나는 플랜테인 바나나를 비롯하여 맛있기로 유명한 빨간색을 가진 레드 바나나와 노란색과는 거리가 먼 파란색을 가진 블루 자바 바나나, 그리고 독을 품고 있는 바나나도 존재한다. 사과 맛이 나는 바나나라든가, 빨간 바나나라든가 하는 것들도 많다. 2010년대 들어 한국에도 새로운 바나나들이 조금씩 들어오고 있는 듯. 로즈 바나나라든가, 바나플이라는 이름으로 팔리는 만자노 바나나라든가.",
    "사람들이 주로 먹는 바나나인 캐번디시는 애호가들 사이에서는 가장 맛없는 바나나로 통한다. 품종을 선택할 때에 병충해 저항성, 보관 및 운송의 편의성을 고려하다 보니 맛까지 챙길 수는 없었던 것.",
    "중간크기의 바나나 118g 기준 105kcal이다. 또한 비타민C(일일 섭취량의 11%), 비타민B6, 엽산(비타민B9, 33%), 비타민A, 베타-카로틴, 식이섬유질(3.1g), 마그네슘(8%), 구리 (10%), 망간 (14%) 그리고 풍부한 칼륨(400㎎ 안팎, 9%)을 함유하고 있으며 지방과 나트륨, 그리고 콜레스테롤은 전혀 없다. 바나나는 100g당 약 22.6g의 당이 들어있는데 이는 단 맛을 내는 과일 중에서도 매우 높은 수준이며, 자당 40%, 포도당 36%, 과당 24% 정도의 비율로 구성되어 있다.",
    "덧붙여 바나나는 키위 그리고 체리와 더불어 정신 건강에 좋은 과일로 손꼽힌다. 때문에 우울증이나 불안장애가 있는 사람들이 꾸준히 먹으면 좋은 효과를 볼 수 있는 과일로 알려져 있다. 사람의 몸에서 생산되는 세로토닌이라는 물질은 감정과 기분 그리고 불안 조절에 크게 관여한다. 세로토닌이 부족해지면 우울증과 불안 장애 그리고 공황 장애 같은 신경증 질환이 발생한다. 보통 항우울제는 뇌하수체에서 세로토닌 분비를 촉진시키는 작용을 하는 것으로 알려져 있는데, 바나나 안에 들어 있는 비타민과 트립토판은 뇌하수체에서 세로토닌 생산을 촉진시킨다.",
    "장염에 걸렸을 때도 별 걱정없이 먹을 수 있다. 다만 상술했듯 바나나에는 칼륨이 많으므로 칼륨에 예민한 신장 질환 환자는 딸기, 수박, 키위와 더불어 바나나 섭취를 피해야 한다. 칼륨은 나트륨 배출에 꼭 필요한 영양소이지만 신장 기능이 떨어지면 칼륨을 제대로 배출하지 못해 고칼륨혈증이 발생할 수 있다. 건강한 사람들도 하루에 7개 이상 먹지 않는 게 좋다.",
    "스프라이트에 바나나를 넣으면 콜라에 멘토스를 넣었을 때와 같은 효과가 발생한다고 한다. 함께 먹지 않도록 주의하자.",
    "베트남 분보에서는 바나나 줄기도 먹는다고 한다. 마치 한국에서 고구마 줄기나 토란대를 나물로 무쳐 먹듯이 말이다.",
    "일본의 요미우리 자이언츠의 투수 크리스토퍼 메르세데스는 흰 쌀밥에 곁들여 반찬으로 먹는다. 다른 반찬이나 소스 없이 바나나만 밥 위에 올려서 먹는데 본인 말에 의하면 영양소가 풍부해서 여름 보양식으로 제격이라고 한다.",
    "2011년 기준으로 바나나의 최대 생산국은 인도이지만 자국 내의 소비량도 많기 때문에 최대 수출국은 에콰도르다. 2011년 국가별 바나나 생산량과 수출량은 다음과 같다. 우간다는 바나나가 주식이기 때문에 대부분 자국 내에서 소비된다.",
    "'바나나는 사악한 다국적 기업이 재배한다'는 말도 유명하다. 바나나는 플랜테이션 농업을 통해서 현대의 위치가 형성된 과일이기 때문이다. 다국적 기업덕택에 전 세계적으로 바나나가 대중화되었기는 했지만 그 다국적기업들이 일으킨 문제점들이 단순한 갑질이나 노동착취 수준을 넘어 식민지화에 공헌하고 더 나아가 바나나 재배국가들의 민주주의 체제까지 뒤엎고 독재정권을 후원했으며 엄청난 양극화에 공헌하여 현대까지도 엄청난 후유증을 남겼기 때문이다.",
    "바나나는 환율 척도로서 중요한 역할을 했는데, 그 이유는 장기 저장이 어렵고 수입에 거의 전량을 의존하여 환율 변화의 지표를 상당히 빠르게 반영하기 때문이었다.",
    "2022년 5월 11일 진도군에서도 바나나와 애플망고를 재배 시작했다.",
    "북한에서는 기후 특성상 바나나는 죄다 중국에서 수입해야 되었고, 유통망도 상당히 열악하여 북한의 소득 수준에 비해 바나나가 매우 비싼지라 1990년대 초반까지의 남한과 마찬가지로 귀한 과일 대접이다. 그러다가 2018년부터 온실 재배가 시작되었고 2020년부터는 본격적으로 유통되기 시작했다. 다만 바나나 온실 재배가 시작되더라도 유지비가 만만치 않기 때문에 여전히 귀한 과일 취급받는 것은 한동안 여전할 듯하다.",
    "리움미술관에 전시되어 있던 마우리치오 카텔란의 바나나 작품(1억 5000만원 상당)을 어떤 남성이 먹어치운 것이 화제가 되기도 했다.",
  ];

  const lemon: string[] = [
    "신맛과 비타민 보충 목적으로 항해 등에서 레몬과 라임 등이 많이 사용되었기 때문에, 레몬이나 오렌지 하면 비타민C라는 이미지가 강하다. 그래서 비타민 C 함량이 높은 식품은 'XX에는 레몬 n개에 해당하는 비타민 C를 가지고 있다.'는 식으로 설명하는 경우가 많다. 또한 비타민 정제 등에는 레몬향으로 착향, 착색을 하는 경향이 있다.",
    "당도는 없진 않지만 일단 매우 시기 때문에 생으로 먹긴 힘들고 보통 즙을 내 뿌리거나 잘게 간 뒤 희석시켜 먹는 게 일반적인 섭취 방법. 물론 통 레몬을 먹는 사람들도 있으며, 생 레몬 먹기 대회도 있다. 기네스 기록으론 마이클 케니라는 사람이 한 번에 레몬 200개를 먹은 게 최대. 사실 조금 새콤한 오렌지라 생각하고 먹으면 나쁘지 않다는 것을 알 수 있다. 생레몬도 조각내지 말고 통으로 입에 넣고 좀 버티다 보면 단맛이 나긴 난다. 단맛을 느낄 새도 없이 신맛이 덮쳐버리는 게 문제.",
    "지중해 지역 사람들은 레몬을 많이 먹는다. 물론 통으로 먹는 건 아니고, 레몬즙을 먹는데 특히 그리스 요리와 튀르키예 요리에서는 조금만 맛이 느끼하다 싶으면 레몬을 넣는 경향이 있다. 주로 생선 구이나 양고기 요리에 들어간다. 샐러드 드레싱으로도 많이 쓴다.",
    "닭튀김에다가 레몬 소스를 뿌리면 레몬치킨을 만들 수 있다. 실제로 레몬 치킨은 광동 요리이며, 서양의 영향을 받은 홍콩에서 즐겨 먹는 요리다. 일본 요리인 카라아게에도 레몬즙을 뿌려 먹기도 하는데, 취향에 따라서는 안 뿌려 먹는 자들도 있다 보니 레몬즙을 뿌려 먹느냐 그냥 먹느냐에 대한 논쟁은, 탕수육을 부먹으로 먹느냐 찍먹으로 먹느냐에 맞먹는 떡밥이다.",
    "레몬은 90%가 수분으로 이루어져 있으며 100g당 30kcal이다. 비타민, 무기질, 인, 식이섬유가 풍부하다. 특히 항산화 성분인 리미노이드가 풍부해서 활성 산소 및 노화의 억제에 도움이 된다. 또한 혈액 순환 개선 및 면역력에도 도움된다. 그래서 해독 제품으로 많이 애용한다. 또한 비타민 C가 풍부하며 피로 회복 및 피부에 좋다. 비타민 C는 잘 파괴되기에 요리 직전에 즙을 짜서 사용하는 것이 좋다.",
    `시인 이상의 유언은 "레몬 향기가 맡고 싶소"라고 한다. 다만 "멜론 향기가 맡고 싶소"라는 말이 와전되었다는 말이 있다. 레몬 향기의 뜻을 '서양 문물에 대한 동경' 등으로 해석하기도 한다. 혹은, 결핵으로 32세에 사망한 카지이 모토지로의 레몬이 생각났을지도 모른다.`,
    "레몬을 잘라서 과육 부분을 팔꿈치나 무릎에 까맣게 변한 부분에 문지르면 없어지는 효과가 있다.",
    "영어권 속어로 레몬은 쓸모없거나 흠이 있는 물건, 사람을 의미한다. 특히 자동차(중고차) 관련해서 많이 사용된다.",
  ];

  const cherry: string[] = [
    "벚나무의 열매. 순우리말로는 버찌라고 한다. 다만 보통 한국에서 접하는 사진의 서양버찌는 체리라 부르고 동양버찌는 버찌라고 별개로 부르는 편이 많다. 자세한 내용은 버찌 문서 참고.",
    "한국에서 벚나무는 매우 흔하지만 벚꽃 관상용으로 길에 심은 대부분의 벚나무의 열매들은 크기도 작고 맛도 없으니, 비슷하다고 먹지 않는 게 좋다. 혹시 먹어보려는 사람들을 위해 말하지만 엄청 시고 떫다. 레몬보다 더 신 경우도 있다. 굳이 관상용 벚나무의 열매를 먹어 보려면 빨간 것은 거르고 새까맣고 말랑한 걸 고르자. 체리라는 이름으로 파는 서양버찌는 열매는 크고 맛있지만 꽃이 동양의 벚꽃보다 별로 화려하지 않고 작은 편이다.",
    "후르츠 칵테일 안에 든 체리는 꽤 귀하다. 다른 과일들에 비해 그 숫자가 적다. 아쉬운 사람이라면 시중에 유통되는 마라스키노 체리 같은 걸 알아보자. 일반 슈퍼나 마트에선 찾기 힘들고, 식자재나 온라인몰을 좀 뒤져야 한다.",
    "또 해마다 바뀌는 순위긴 하지만 2020년 기준 세계에서 (아마도 면적대비) 가장 체리 생산량이 많은 나라는 튀르키예이다.",
    "볶지 않은 생아몬드의 경우 체리와 상당히 유사한 향이 난다. 아몬드 역시 벚나무속이다.",
    "체리에는 눈에 좋은 안토시아닌, 피를 맑게 해 혈액 순환을 개선하고 LDL 수치와 혈압을 낮추는 효과가 있는 레스베라트롤, 어느 정도 수면에 도움이 되는 멜라토닌, 케르세틴과 같은 항산화물질이 풍부해 다양한 질병 예방과 노화에 좋다.",
    `웹 색상에서 체리색(cherry)은 #dc0025을 가리킨다.`,
    "체리는 사람 이름으로 쓰이기도 한다. 한국에서도 이 이름이 흔하지는 않아도 쓰이는데, 바리에이션으로 채리라고 쓰이기도 한다. 2000년대 태어난 아이들은 젊은 감각을 가진 신세대 부모를 가졌기에 이 이름도 늘어나는 추세이다. 매체에서도 쓰는데 카드캡터 사쿠라 중 키노모토 사쿠라의 한국 번안명인 유체리나, 체리툰의 남체리 등이 있다.",
  ];

  const melon: string[] = [
    "멜론은 쌍떡잎식물 박목 박과 오이속의 덩굴성 한해살이풀 멜론종의 총칭이다. 수분이 많아 시원한 식감이 있으며, 부드럽고 달콤한 과육으로 인기가 높다.",
    "영어권에서 쓰는 'Melon'과 대한민국에서 일상적으로 칭하는 '멜론'이 포함하는 범위는 약간 차이가 있는데, Melon은 박목 박과에서 오이속, 수박속, 동아속을 총칭하는 의미다. 수박이 'Watermelon'인 것도 이 때문이다. 이에 반해 대한민국에서 일상적으로 칭하는 멜론은 오이속 내 머스크멜론(C. melo)과 아종을 의미한다. 미국 등 다양한 멜론 품종을 쉽게 접할 수 있는 곳에서는 보통 해당 품종명으로 부른다.",
    "'메론'으로도 많이 알려져 있으나, 영어 Me'l'on을 기준으로 한 외래어이므로 '멜론'으로 발음하고 적는 것이 옳다. 국립국어원 표준도 멜론이다. 메론은 어디까지나 일본식 발음(メロン)에 기원을 둔 발음이다.",
    "멜론은 맛있게 먹기 위해 후숙이 필요한 과일이다. 후숙 과정 없이 먹을 경우 딱딱한 데다 씨앗이 있는 태좌 부분을 제외하면 전체적으로 수박의 흰 부분 먹는 맛밖에 없다. 후숙을 하려면 멜론을 선반 밑과 같이 서늘하고 직사광선이 들지 않는 곳에 2~7일 동안 두면 된다. 멜론의 밑동 부분을 손가락으로 힘을 주어 눌렀을 때 말랑말랑한 느낌이 들면 된 것이다.",
    "멜론의 효능 : 칼륨이 풍부하다. 이뇨 효과가 있어 몸의 부기를 빼고 신장 기능에 도움을 준다. 비타민C가 함유되어 있다. 과육에 함유된 카로티노이드는 암을 예방하는 효과가 있다. 특히 폐암 예방용으로 좋다. 멜론은 당분과 수분이 많아 체내 수분 보충에도 도움을 준다.",
    "멜론의 대명사라 할 수 있는 머스크멜론은 한때 가격이 많이 비쌌지만, 할인마트 등에서 수박보다 싼 가격에 구매할 수 있다.",
    "멜론 고르는 방법 : 같은 크기에서도 무게가 유달리 무거우며, 멜론의 밑동(배꼽) 부분을 손가락으로 눌렀을 때 3mm 정도는 들어갔다가 되돌아오는 것이 잘 익은 멜론이다. 눌렀을 때 지나치게 말랑말랑한 멜론, 네트가 어두운색인 멜론, 손으로 들었을 때 다른 것들보다 무게가 가벼운 멜론은 너무 익거나 썩어서 속이 곯은 것들이다.",
    "식물학적 정의 및 사전적 정의 혹은 일상적 정의와 관계 없이, 현재 대한민국에서 멜론의 법적 지위는 과일이다. 멜론이 과일인가 채소인가하는 논쟁은 학문적으로 의미가 없다. 영미권에서 열매는 fruit이므로 세계적으로도 관세를 따질때를 제외하곤 논란거리가 되지 못한다. 굳이 따지자면 식물학보다는 오히려 언어학 혹은 사전학과 관련하여 의미를 찾을 수 있다.",
    "일본의 경우 참외의 아삭한 식감을 좋아하지 않아서 참외보다 멜론의 인기가 높다.",
    "일본에서는 멜론이 입원 환자의 병문안용 과일로 많이 등장한다. 한때 고급 햄과 멜론이 선물의 정석이었던 시절의 이미지를 그대로 물려받는지, 모두가 선호하는 과일로 등장한다. 멜론이라면 모두 최고라고 쳐주는 게 아니고, 유바리 멜론을 최고로 친다.",
  ];

  const watermelon: string[] = [
    `마크 트웨인은 수박에 대해 "세상 모든 사치품의 으뜸이며, 한번 맛을 보면 천사들이 무엇을 먹고 사는지 알 수 있을 것이다."라는 말을 남기기도 했다.`,
    "수박은 열매를 식용하는 과채류, 즉 채소이다. 과일로도 분류되는데, 어차피 실생활에서의 채소냐 과일이냐의 구분은 계통분류학적인 고찰을 따지는 것이 아니라 용도에 따른 임의적 구분에 불과하다. 당장 친척뻘인 초본성 박과 열매 중에서 호박, 오이 등은 다 채소인데 이것과 참외는 과일 대우를 하는 게 좀 모순이긴 하다. 아마 단맛 때문에 그런 듯하다.",
    "농산물 대국인 중국이 전 세계 수박 생산량의 68%를 재배한다. 그 밖에 터키, 이란, 브라질, 미국 등에서도 꽤 재배된다. 제철은 여름이지만 요새는 비닐하우스에서 1년 내내 재배가 가능하다.",
    "프라이드 치킨과 더불어 미국 흑인들의 삶의 애환이 담긴 음식이라고 알려져 있다. 특히 흑인들이 수박을 광적으로 좋아한다는 스테레오타입이 있다. 이럴 수밖에 없는 것이 미국에서는 수박이 매우 싸다. 일단 미국 남부와 서부에서 많이 재배하고, 그와 더불어 멕시코에서도 엄청 재배해서 미국으로 수출해 가격이 매우 싸다. 여름철에 큰 수박 1통에 4달러 정도밖에 안 하는 데다가, 큼직하고 맛도 달콤하니 상대적으로 저소득층이 많이 찾는 먹거리가 된 것이다.",
    "호주 수박은 대체로 맛이 없다라는 소리가 있지만 케이스 바이 케이스다. 호주란 나라가 원래 기후가 가뭄이 왔다가 홍수가 나는 등, 아주 제멋대로이기 때문에 기후에 따라서 맛이 천차만별이다.",
    "그와는 반대로, '능라도 수박 같다'라는 말에서 보듯 맛없는 음식을 보고 수박에 비교하기도 한다. 대동강을 끼고 있는 능라도는 장마 때마다 물이 차서 여기서 키우는 수박은 달지도 않고 맛이 밍밍하기 때문이다.",
    "광주광역시 일대에는 그 지역에서만 자라는 무등산수박이 유명하다. 무등산수박은 한국의 토종 수박으로 씨앗이 하얗다. 무등산 수박은 무등산 중에서도 토질이 맞는 곳에서만 자라는 데다가, 이름값과 희소성이라는 이유로 가격이 장난이 아니게 비싸다. 20kg대는 기본적으로 20만 원은 깔고 시작하며, 30kg 이상부터는 아예 부르는 게 값이다.",
    "일본에서는 네모난 수박도 만든다. 식용이라기보다는 장식용으로, 개당 1만엔 정도에 팔린다고 한다.",
    "일본에선 무게만 8kg를 가볍게 넘는 덴스케 수박이 있다. 다른 수박과는 다르게 완전히 둥글고 검정색에 가까우며 희귀해서 그런지 10,000개만 재배된다고 한다. 가격은 한화로 720만원, 다만 이 정도로 거래되는 것은 사람들의 주목을 끌기 위한 경매가 가격이고, 실제는 2-3만엔에서 거래된다고 한다. 한화 약 20-30만원 선인데 물론 결코 싼 금액은 아니다.",
    "속이 빨갛고 크기도 적당하며 즙이 많아서 사람 머리가 터져나가는 장면이 수박이 박살나는 모습으로 대체되기도 한다. 저격수 훈련에선 사람 모양 표적의 머리 부분에 수박을 달아놓는데, 크기도 사람 머리 비슷한 게 총으로 쏘면 빨간 게 사방으로 터지기 때문에 싼값으로 충분한 리얼리티를 재현할 수 있다고 한다.",
  ];

  const pineapple: string[] = [
    "파인애플은 나무가 아닌 풀(草)이다. 파인애플 산지가 아닌 국가에서 의외로 파인애플이 어떤 모습으로 열리는 지 잘 모르는 사람들이 많다. 열대과일, 그리고 알로에 코스프레를 하고 있는 딱딱하고 뾰족한 이파리 때문인지, 나무에서 다른 과일처럼 파인애플이 열린다고 생각했던 많은 한국인에게 파인애플 농장의 사진은 충격과 공포를 선사한다. 비슷한 예로 바나나 송이가 있다.",
    "혀가 아릴 정도로 단맛이 강한데 이는 파인애플이 지닌 산 때문임에도 있고. 이로인한 신맛은 단맛을 더욱 강하게 해준다.",
    "파인애플 잎사귀를 이용한 가죽 피나텍스(Pinatex)가 신소재로 각광받고 있다. 파인애플 약 16개 분량 또는 480개의 잎사귀로, 1평방미터의 피나텍스를 생산할 수 있으며, 가죽에 비해 1/4 수준으로 가볍고 30% 가량 단가가 낮다고 한다. 왁스 가공을 통해 방화기능, 견고한 내구성을 가지게 된다고 한다.",
    "과일 회사 중 제일 큰 Dole사는 하와이의 파인애플 이권다툼 틈바구니에서 성장했다. Dole사의 창업주인 제임스 돌의 사촌이 바로 하와이 왕국의 마지막 국왕 릴리우오칼라니를 무력으로 왕위에서 퇴위시키고 하와이 공화국의 대통령 자리에 오른 샌퍼드 돌이다. 샌퍼드 돌이 권력을 잡고 하와이 원주민들의 땅을 빼앗아 하와이의 막대한 농업 이권을 다 백인들에게 뿌릴 때, 사촌동생인 제임스가 아주 큰 파인애플 농장을 받았다. 이일 뿐만 아니라, 이후에 벌어지는 다른 많은 구설수들로 인해 Dole사는 세계에서 가장 추악하고 부도덕한 회사를 논할 때 항상 수위권에 오르는 회사 중 하나이다.",
    "네모바지 스폰지밥에서 스폰지밥의 집이 파인애플로 등장한다. 원래는 스폰지밥이 비키니 시티로 상경해 집을 찾고 있을때 바다 위 배의 선상에 있던 파인애플이 떨어져 집이 된것이다.",
    "스튜디오 지브리 작품인 ｢추억은 방울방울｣에서는 60년대 고도성장기의 흔한 일본 가정에서 이 미지의 남국 열대과일을 어떻게 먹는지 가족들이 궁금해하는 장면이 나온다.",
    "영화 ｢중경삼림｣의 첫 번째 이야기 주인공 하지무(금성무)는 유통기한이 1994년 5월 1일까지인 파인애플 통조림을 모은다. 파인애플 통조림을 좋아하는 자신의 연인 메이가 헤어질 때 5월 1일까지 시간을 갖자고 했기 때문. 그러나 막상 5월 1일이 되어 메이에게 전화를 걸어보니 웬 남자가 받는다. 열받은 하지무는 하룻밤 사이에 20통이 넘는 파인애플 통조림을 한꺼번에 먹어치운다.",
    "파인애플은 중앙아메리카와 남아메리카 북부 원산으로 그곳에서는 오래 전부터 재배했고, 포르투갈, 스페인을 통해 세계 각지에 퍼졌다. 루이 14세가 껍질도 안 벗기고 손으로 집어먹었다가 혀를 다쳐 분노한 나머지 이 과일을 먹는 것을 금지하기도 했다.",
  ];

  const blueberry: string[] = [
    "서유럽에서 블루베리는 아주 흔한 과일이다. 게다가 한국과 정반대로 기후도 다르고 사민주의 정서 때문인지 자연향유권(freedom to roam) 개념이 있어서 숲에서 자유롭게 블루베리를 채취할 수 있다.",
    "블루베리가 시력 향상에 효과가 있다는 연구 결과가 계속 나오고 있다. 또 야간 시야에 도움이 된다는 얘기도 있는데, 이는 야맹증에 걸렸던 게 아니라면 그 이상의 효과는 없다.",
    "블루베리를 한번에 많이 섭취하면 색소 때문에 검은색 변을 볼 수 있다. 또 자꾸 먹다 보면 혀와 입술 주변이 시커멓게 물들어버리는데 혀에 묻은 색소는 양치질을 하면 지워지긴 하지만 입술에 묻으면 잘 안 지워진다.",
    "롯데에서 개발한 블루베리 껌이나 각종 블루베리 가공식품에 들어간 인공 블루베리 향은 실제 블루베리 향이 아니라고 한다. 실제 블루베리의 향은 매우 약하다. 우리에게 익숙한 블루베리 향은 조향사가 블루베리에 어떤 향이 어울릴지 상상하며 향을 만든 것이다.",
    "블루베리는 ｢주토피아｣의 등장인물 닉 와일드가 좋아하는 과일이다. 주디 홉스의 가족이 운영하는 농장에서 재배하는 과일이기도 하다.",
    "｢찰리와 초콜릿 공장｣에서 바이올렛 뷰리가드는 윌리 웡카의 미완성 삼시세끼 껌을 먹다가 몸이 파랗게 변하고 몸속에 주스가 차올라 인간 블루베리가 된다. 이후 움파룸파들의 도움으로 과즙을 다 짜서 원래 체형으로 돌아오지만, 피부색만은 복원되지 않는다.",
  ];

  const orange: string[] = [
    "전용 칼 없이 오렌지 껍질을 쉽게 까는 법은 몇 가지가 있는데, 일단 조금이라도 뜯어내서 틈새를 만들고 나면 그다음부터는 쉬운 편이라 껍질에 칼질을 하는 게 보통이다. 또는 알맹이가 나눠지는 방향을 따라 칼질을 한번 하고 둘로 쪼개는 방법이 있다. 한 바퀴 빙 둘러 껍질에 칼질한 다음 껍질이랑 과육 틈새로 숟가락을 끼워 넣는 방법도 있다. 맨손으로 하고 싶다면, 탁상같은 평평한 곳에 세게 누르면서 몇 바퀴 굴리면 된다. 이러면 껍질이랑 과육 사이에 공간이 생기면서 그냥 하는 것보다 더 쉽게 뜯을 수 있다. 그런 다음 위쪽이나 아래쪽 꼭지 부분부터 뜯으면 된다.",
    "오렌지를 생으로 먹기도 하지만, 보통은 주스로 만들어 먹는다. 오렌지 치킨처럼 소스에 넣어도 맛있고, 아예 피자에 올려 구워 먹어도 맛있는 과일이다. 한국에선 보기 힘들지만 이탈리아 등에서는 실제로 오렌지를 올린 피자가 많다.",
    "오렌지는 시트러스 계열 향수의 원료로도 자주 쓰인다. 대표적으로 조말론의 오렌지 블라썸, 세르주루텐의 오랑쥬 등이 있다.",
    "오렌지는 미국 캘리포니아에서 1월~5월에 출하하기 때문에 한국에서는 2월~6월이 가장 저렴하다. 하지만 11월까지 재배가 되므로 거의 1년 내내 오렌지를 맛볼 수 있다.",
    "영어 'orange'는 1300년대에 프랑스어로부터 유입되었다. 오늘날에도 영어, 프랑스어, 독일어로 모두 철자가 동일하다. 주황색을 상징하게 된 것은 1540년 경으로 조금 더 후대이다.",
    "영화 ｢대부｣에서는 누군가 오렌지를 만지면 같은 장면에 나온 인물이 험한 꼴을 당하거나 죽는 일종의 사망 플래그로 나온다.",
  ];

  const kiwi: string[] = [
    "뉴질랜드인의 대표적 별칭으로 Kiwi(키위)가 있다. 키위새 이름에서 유래한 별명이다. 백인에 한정하는 경향이 있는 듯하지만 꼭 그래야 한다는 법칙은 없다. 현대에는 뉴질랜드인이면 인종에 상관없이 다 키위라고 불러주는 추세이다. 물론 아시안계도 마찬가지다. 여담으로 한국계 뉴질랜드인들은 스스로를 Kowi(코위) 또는 Korean Kiwi(코리안 키위)라고 자칭한다. 덕분에 한국에선 과일의 종류인 키위를 부를때 그냥 키위라고 부르지만 뉴질랜드에선 꼭 Kiwi fruit이라고 불러줘야 한다. 뭐 진짜로 꼭 그래야 할 필요는 없지만 뉴질랜드 사람들은 많이 헷갈려 하니 신경 써 줘서 나쁠건 없다.",
    "2010년대에 인터넷 주소를 관리하는 ICANN의 정책이 바뀌면서 특정 요건을 충족시키면 ISO 3166-1 코드의 국가 코드 최상위 도메인이 아닌 지역·민족 집단·언어권 등을 위한 최상위 도메인(GeoTLD)을 창설할 수 있게 되었다. 또, 이미 최상위 도메인이 있는 나라도 이런 걸 만들 수는 있다. 이에 따라 뉴질랜드의 민간 기업이 .kiwi 도메인을 ICANN에 등록해서 현재 정식 서비스 중이다.",
    "영국 공군에서는 키위가 지상 근무원을 지칭하는 속어로 쓰인다.",
    "The Chromium Projects 기반 웹 브라우저로 Kiwi Browser가 있으며 오리지널 Chrome에선 제공도 안하는 확장 프로그램을 지원한다.",
  ];

  useEffect(() => {
    const container = document.getElementById("fruit-container");
    const interval = setInterval(() => {
      const fruit = document.createElement("div");
      const randomFruit =
        fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
      fruit.innerHTML = randomFruit;
      fruit.style.left = `${Math.random() * 100}%`; // 과일이 왼쪽에서부터 어떤 위치에서 내려올지 랜덤하게 지정한다
      container?.appendChild(fruit);

      fruit.style.pointerEvents = "auto"; // 이벤트를 활성화한다

      fruit.addEventListener("mouseover", () => {
        fruit.style.cursor = "pointer";
      });

      if (window.outerWidth < 450) {
        const clickHandler = () => {
          if (fruit.innerHTML === "🍎" || fruit.innerHTML === "🍏") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(apple[Math.floor(Math.random() * apple.length)]);
          } else if (fruit.innerHTML === "🍇") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(grape[Math.floor(Math.random() * grape.length)]);
          } else if (fruit.innerHTML === "🍓") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(strawberry[Math.floor(Math.random() * strawberry.length)]);
          } else if (fruit.innerHTML === "🍌") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(banana[Math.floor(Math.random() * banana.length)]);
          } else if (fruit.innerHTML === "🍋") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(lemon[Math.floor(Math.random() * lemon.length)]);
          } else if (fruit.innerHTML === "🍒") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(cherry[Math.floor(Math.random() * cherry.length)]);
          } else if (fruit.innerHTML === "🍈") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(melon[Math.floor(Math.random() * melon.length)]);
          } else if (fruit.innerHTML === "🍉") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(watermelon[Math.floor(Math.random() * watermelon.length)]);
          } else if (fruit.innerHTML === "🍍") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(pineapple[Math.floor(Math.random() * pineapple.length)]);
          } else if (fruit.innerHTML === "🫐") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(blueberry[Math.floor(Math.random() * blueberry.length)]);
          } else if (fruit.innerHTML === "🍊") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(orange[Math.floor(Math.random() * orange.length)]);
          } else if (fruit.innerHTML === "🥝") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(kiwi[Math.floor(Math.random() * kiwi.length)]);
          }
        };

        fruit.addEventListener("touchstart", clickHandler);
      } else {
        const clickHandler = () => {
          if (fruit.innerHTML === "🍎" || fruit.innerHTML === "🍏") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(apple[Math.floor(Math.random() * apple.length)]);
          } else if (fruit.innerHTML === "🍇") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(grape[Math.floor(Math.random() * grape.length)]);
          } else if (fruit.innerHTML === "🍓") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(strawberry[Math.floor(Math.random() * strawberry.length)]);
          } else if (fruit.innerHTML === "🍌") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(banana[Math.floor(Math.random() * banana.length)]);
          } else if (fruit.innerHTML === "🍋") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(lemon[Math.floor(Math.random() * lemon.length)]);
          } else if (fruit.innerHTML === "🍒") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(cherry[Math.floor(Math.random() * cherry.length)]);
          } else if (fruit.innerHTML === "🍈") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(melon[Math.floor(Math.random() * melon.length)]);
          } else if (fruit.innerHTML === "🍉") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(watermelon[Math.floor(Math.random() * watermelon.length)]);
          } else if (fruit.innerHTML === "🍍") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(pineapple[Math.floor(Math.random() * pineapple.length)]);
          } else if (fruit.innerHTML === "🫐") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(blueberry[Math.floor(Math.random() * blueberry.length)]);
          } else if (fruit.innerHTML === "🍊") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(orange[Math.floor(Math.random() * orange.length)]);
          } else if (fruit.innerHTML === "🥝") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(kiwi[Math.floor(Math.random() * kiwi.length)]);
          }
        };

        fruit.addEventListener("click", clickHandler);
      }

      setTimeout(() => {
        fruit.remove();
      }, 10000);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [checkerWidth, setCheckerWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.outerWidth < 450) {
      setCheckerWidth(window.outerWidth / 7);
    } else {
      setCheckerWidth(window.outerWidth / 14);
    }
  }, []);

  return (
    <>
      <div
        className="fruits-container"
        style={{
          backgroundSize: `${checkerWidth * 2}px ${checkerWidth * 2}px`,
          backgroundPosition: `0 0, 0 ${checkerWidth}px, ${checkerWidth}px -${checkerWidth}px, -${checkerWidth}px 0px`,
        }}
      >
        <div className="fruit-count"></div>
        <div id="fruit-container" className="falling-fruits"></div>
      </div>
    </>
  );
};

export default Fruits;
