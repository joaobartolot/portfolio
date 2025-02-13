import Button from './Button';

const DownloadCV = () => {
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = '/cv.pdf'; // Update with the correct path to your CV
		link.download = 'JoaoBartolot_CV.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return <Button onClick={handleDownload}>Download CV</Button>;
};

export default DownloadCV;
