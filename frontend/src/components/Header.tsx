import Link from 'next/link';
import { ChangeEvent, FormEvent } from 'react';

interface HeaderProps {
	showSearch?: boolean;
	search?: string;
	onSearch?: (query: string) => void;
}

export function Header({ showSearch = true, search, onSearch }: HeaderProps) {
	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		onSearch?.(search);
	}

	function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
		onSearch?.(e.target.value);
	}

	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark mt-5">
			<div className="container">
				<Link href="/">
					<img
						className="navbar-brand"
						src="/images/logo.svg"
						style={{
							cursor: 'pointer',
						}}
					/>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{showSearch && (
					<div
						className="collapse navbar-collapse justify-content-end"
						id="navbarSupportedContent"
					>
						<form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
							<input
								className="form-control mr-sm-2"
								type="search"
								placeholder="Procurar"
								aria-label="Procurar"
								value={search}
								onChange={handleSearchChange}
							/>
							<button className="btn btn-light my-2 my-sm-0" type="submit">
								Procurar
							</button>
						</form>
					</div>
				)}
			</div>
		</nav>
	);
}
