import React from 'react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAppProvider } from '../context/appProvider'
export default function PhotoUpload() {
    const { setFiles, files } = useAppProvider()

    const onDrop = useCallback((acceptedFiles) => {
        if (!acceptedFiles.length) return;

        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            const binaryStr = reader.result
            }
            
            reader.onloadend = () => {
                const blob = new Blob([reader.result], { type: file.type });
                const url = URL.createObjectURL(blob);
                console.log(file)
                setFiles([{ data: url, file }]);
            }
            reader.readAsArrayBuffer(file)
        })
    }, [setFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" })
  if(files.length > 0) {
    return <div>
    <div className='w-full h-64 rounded-lg overflow-hidden'>
        <img src={files[0].data} alt="Uploaded" className='w-full h-full object-cover' />
    </div>
    <div className='mt-4 flex justify-between items-center text-xl'>
        <p>{files[0].file.name}</p>
        <p onClick={()=>setFiles([])} className='cursor-pointer text-red-400 hover:text-red-600 text-right mt-2'>Remove</p>
    </div>
    </div>
  }
  return <label {...getRootProps()} htmlFor="recipe-photo" className='flex flex-col items-center justify-center border-dashed border border-green-900 h-64 w-full rounded-lg cursor-pointer'>
        <div className='text-7xl'><ion-icon name="cloud-upload-outline"></ion-icon></div>
        <p className='text-gray-600 text-3xl'>{isDragActive ? "Drop the files here ..." : "Upload Recipe Photo"}</p>
        <input {...getInputProps()} type="file" className='hidden' name="recipe-photo" id="recipe-photo" />
    </label>
}
