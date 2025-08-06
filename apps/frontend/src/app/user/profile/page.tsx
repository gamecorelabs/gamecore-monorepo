import UserProfileHeader from "@/components/ui-library/user/profile/UserProfileHeader";
import UserProfileForm from "@/components/ui-library/user/profile/UserProfileForm";

const UserProfilePage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <UserProfileHeader />
      <UserProfileForm />
    </div>
  );
};

export default UserProfilePage;
