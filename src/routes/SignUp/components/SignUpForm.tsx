import { Calendar } from "@/components";

export const SignUpForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log((e.target as unknown as any)["beginDate"].value);
        console.log((e.target as unknown as any)["endDate"].value);
      }}
    >
      <Calendar tripDayNum={3} />
      <button type="submit">회원가입</button>
    </form>
  );
};
