# 폴더 구조

- **Components**: 페이지에서 사용할 컴포넌트를 담는 폴더.
- **Page**: 페이지 컴포넌트를 담는 폴더.
- **Types**: 컴포넌트에서 사용할 타입들을 담는 폴더.

# 구현 사항

## 리소스 등록 및 수정 및 삭제

- "URL 추가" 버튼을 클릭하면 입력 필드가 렌더링 되고 포커스 됩니다.
- 입력 필드에서 포커스가 사라지면 URL이 저장됩니다.
- YouTube URL의 경우, 임베드 형식으로 변환되어 저장됩니다.
- 올바르지 않은 URL이 입력된 경우, 모달 창이 나타나 사용자에게 다시 입력할지 삭제할지 물어봅니다.
- 리소스 수정 시 이미지와 URL의 제목만 수정하고 내용은 변경되지 않게 구현했습니다.

## 리소스 뷰어

- 리소스를 클릭하면 오른쪽 리소스 뷰어에 렌더링 됩니다.
- 리소스 제목에 x 버튼을 클릭하여 뷰어를 닫을 수 있습니다.

# 추가 구현 사항

- 드래그 앤 드롭으로 이미지를 업로드할 수 있습니다.
- 파일 수정 및 저장 시 토스트를 출력해 유저 피드백을 제공합니다.

이외에도 필수 구현 사항을 다 구현했습니다.
