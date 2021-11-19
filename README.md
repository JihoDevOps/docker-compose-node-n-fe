# Partitioning Front-End

### Goal

>   - [X] Front-End의 덩치가 커져 감당 못하기 전에 분리한다.
>   - [ ] 개발 환경을 구축하고 테스트한다.

### Needs

>   -   Docker
>   -   Node
>   -   Vue

---

## First Projects Structure

```bash
# Front-End Wrapper
frontend ---+--- router | Node # serve only html files
            |
            +--- alpha  | Vue  # atomic vue project
            |
            +--- beta   | Vue  # atomic vue project

# Web Server
proxy | Nginx
```

1.  ### Overview
    -   최대한 `Node` 서버를 사용하지 않으려 했다.
    -   초기에는 `Nginx`로만 빌드된 결과물을 `serve` 하려고 했다.
    -   수십 번의 실패를 거듭하고, 결국엔 중도를 택했다.
    -   Web Server 역할을 하는 `proxy Nginx`는 `Node`만 바라보게 한다.
    -   `Nginx`로부터 받은 요청을 `Node`가 각 FE의 `html` 파일을 serve 한다.

2.  ### Flow
    ```bash
     User     Client    Nginx      Node      Alpha
    -----------------------------------------------
      | connect |         |         |          |
      + ------> +   req   |         |          |
      |         + ------> +  proxy  |          |
      |         |         + ------> +  /alpha  |
      |         |         |         + -------> +
      |         |         |         |          |
      |         |         |         |   HTML   |
      |         |         | reverse + <------- +
      |         |   res   + <------ +  a.html  |
      |  render + <------ +  a.html |          |
      | <------ +  a.html |         |          |
      |  a.html |         |         |          |
    ```

3.  ### Issue
    -   #### routing 역할만 수행하는 `Node`를 쓴다는 한계
    -   #### 각 FE 빌드 artifacts 이름의 hash 충돌 가능성
        -   이는 디렉토리를 분리하여 해결할 수 있을 것으로 보인다.
        -   이 구조로 가게 된다고 해도 충돌이 발생할 가능성은 적다.
        -   디렉토리를 분리하려고 노력했으나 정상적으로 구동되지 않았다.
    -   #### 404, 50X 에러 코드 핸들링에 대한 고려가 없다.
        -   Nginx/Apache의 도메인 지식을 넓혀야 한다.
    -   #### `Dockerfile`에 의존적이다.
        -   FE 증설 때마다 그룹화된 `Dockerfile` 재작성이 필요하다.
        -   각 FE에 알아서 넣고 싶었다.
        -   그러나 Docker Domain 지식이 부족하다.
    -   #### 개발환경에 당장 적용할 수 없다.
        -   곧 적용할 예정
    -   #### API 통신 테스트가 되지 않았다.
        -   가능성은 충분하다.

---

## Plan

- [ ] Nginx로만 Routing을 수행
- [ ] Docker Volume을 통해 개발환경 최적화
- [ ] Backend Server의 단순화
- [ ] Docker Compose를 통한 웹 서비스 통합 빌드
- [ ] Root FE(경로가 "/"인 메인 홈페이지), Domain FE 구분
- [ ] Nuxt.js를 통한 정적 페이지 Vue Client 구축(for Wiki, Docs)
- [ ] TDD 기반의 FE 구현
