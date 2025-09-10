
"use client"
import { useAuthContext } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { User } from "@/lib/types.js";
import Image from "next/image.js";
import { redirect } from "next/navigation.js";
import { useEffect, useState } from "react"

const avatars = [ "avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6", "avatar7",
    "avatar8", "avatar9", "avatar10", "avatar11", "avatar12", "avatar13", "avatar14"
];

export const getAvatarUrl = (avatar: string) => {
    return '/images/avatars/' + avatar + '.svg';
};
export const EditProfileClient = () => {
    const { isAuthenticated, user, isLoading, refreshUserData } = useAuthContext();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [avatar, setAvatar] = useState(user?.image || "avatar");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
            setAvatar(user.image || "avatar");
        }
    }, [user, isLoading]);
    
    const { data: updatedUser, execute } = useApi<User>('/auth/profile',{
        method: 'PATCH',
        requireAuth: true,
        body: { name, image: avatar, bio}
    });

    const handleSubmit = () => {
        setLoading(true);
        execute();
        refreshUserData(); 
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Simula un tiempo de espera para la actualización
        setTimeout(() => {
            redirect('/profile');
        }, 1500);
    };
    
    
    const handleAvatarSelect = (selectedAvatar: string) => {
        setAvatar(selectedAvatar);
        setIsModalOpen(false);
    };
    
    if ( loading ) return <div className="flex justify-center items-center h-96">Actualizando...</div>;
    if (!isAuthenticated && !isLoading) return redirect('/auth/login');
    return (
        <>
            <div className="grid grid-cols-2 gap-8 max-w-5xl bg py-5 px-4 sm:px-6 lg:px-8 rounded-xl" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="name" className="block text-md font-medium mt-4">
                        Nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Tu Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="email" className="block text-md font-medium mt-4">
                        Email
                    </label>
                    <p className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm">
                        {email}
                    </p>

                    <label htmlFor="bio" className="block text-md font-medium mt-4">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                        placeholder="Cuéntanos sobre ti..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>

                    <button
                        type="button"
                        onClick={() => handleSubmit()}
                        className="mt-8 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors w-fit"
                    >
                        Guardar Cambios
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center mb-10">
                    <Image
                        src={getAvatarUrl(avatar)}
                        alt={"Avatar seleccionado"}
                        width={150}
                        height={150}
                        className="mt-2 rounded-full border-4 border-white shadow-lg"
                    />
                    <label className="block text-md font-medium mt-4 mb-2">
                        Foto de Perfil
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gray-100 hover:bg-gray-400  px-6 py-2 rounded-md transition-colors text-gray-700 font-medium"
                    >
                        Cambiar Avatar
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="relative bg rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-gray-600">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium ">
                                        Selecciona tu avatar
                                    </h3>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="px-6 py-4 overflow-y-auto max-h-96">
                                <div className="grid  grid-cols-3 md:grid-cols-5 gap-4">
                                    {avatars.map((avatarOption) => (
                                        <button
                                            key={avatarOption}
                                            type="button"
                                            onClick={() => handleAvatarSelect(avatarOption)}
                                            className={`relative  rounded-lg transition-all duration-200 hover:scale-105 flex justify-center items-center ${
                                                avatar === avatarOption
                                                    ? 'ring-3 ring-red-500 bg-red-50'
                                                    : 'hover:bg-gray-600 hover:ring-2 hover:ring-gray-300'
                                            }`}
                                        >
                                            <Image
                                                src={getAvatarUrl(avatarOption)}
                                                alt={`Avatar ${avatarOption.split("avatar")[1]}`}
                                                width={80}
                                                height={80}
                                                className="rounded-full"
                                            />
                                            {avatar === avatarOption && (
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 border-t border-gray-600 ">
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border bg-red-600 rounded-md hover:bg-red-800 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}